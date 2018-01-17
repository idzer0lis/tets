/**
 * Created by sandrastoicescu on 22/11/2017.
 */

const path = require('path');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const logger = require('./logger');
const env = require('../config/env');

const emailMessagesRepo = require('../repositories/email-messages');

/* eslint-disable no-use-before-define */
module.exports = {
  enqueueEmail,
  sendEnqueuedEmails,
};
/* eslint-enable no-use-before-define */

const options = {
  pool: env.SMTP_POOL_ENABLED === 'YES',
  maxConnections: parseInt(env.SMTP_POOL_MAX_CONNECTIONS || '5', 10),
  maxMessages: parseInt(env.SMTP_POOL_MAX_MESSAGES || '100', 10),
  rateDelta: parseInt(env.SMTP_POOL_RATE_DELTA || '1000', 10),
  rateLimit: parseInt(env.SMTP_POOL_RATE_LIMIT || '5', 10),
  port: env.SMTP_PORT,
  host: env.SMTP_HOST,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
};
const transporter = nodemailer.createTransport(options);

const Email = require('email-templates');

const templatesDir = path.resolve(__dirname, '../..', 'emails');
const webResourcesDir = path.join(__dirname, '../..', 'emails/common');

async function sendEnqueuedEmail(emailMessageData) {
  const email = new Email({
    message: emailMessageData.message_header,
    views: {
      root: templatesDir,
      options: { extension: 'ejs' },
    },
    transport: transporter,
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: webResourcesDir,
      },
    },
  });

  return email.send({
    template: emailMessageData.template_name,
    message: emailMessageData.message_contents,
    locals: emailMessageData.message_locals,
  })
    .then(() => Promise.resolve({ success: true }))
    .catch((error) => Promise.resolve({
      success: false,
      error,
    }));
}

function sendMail(mailInfo) {
  const messageUuid = uuidv4();
  logger.info(`Sending e-mail ${messageUuid}`, mailInfo);

  return Promise.mapSeries((mailInfo && mailInfo.recipients) || [], (recipient) => {
    // forced to create new instance of Email with each send by crabby caching of recipient address and subject
    const email = new Email({
      message: {
        from: {
          name: env.SYSTEM_EMAIL_SENDER_NAME,
          address: env.SYSTEM_EMAIL_SENDER_ADDRESS,
        },
        headers: {
          'X-Message-UUID': messageUuid,
        },
      },
      views: {
        root: templatesDir,
        options: { extension: 'ejs' },
      },
      transport: transporter,
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: webResourcesDir,
        },
      },
    });

    return email.send({
      template: recipient.view,
      message: recipient.message,
      locals: mailInfo.locals,
    });
  })
    .then(() => Promise.resolve(true))
    .catch((err) => {
      logger.error('E-mail sending error', err);
      return Promise.resolve(false);
    });
}

function enqueueEmail(mailInfo) {
  if (env.SEND_EMAILS_WITHOUT_ENQUEUEING === 'YES') {
    logger.info('Sending e-mail without enqueueing it in the database');
    return sendMail(mailInfo);
  }

  const messageGroupUuid = uuidv4();

  logger.info(`Enqueueing e-mail group ${messageGroupUuid} (${mailInfo && mailInfo.recipients && mailInfo.recipients.length} recipients)`, mailInfo);

  return Promise.mapSeries((mailInfo && mailInfo.recipients) || [], (recipient) => {
    const messageUuid = uuidv4();

    const serializedData = {
      group_tracking_id: messageGroupUuid,
      email_tracking_id: messageUuid,
      template_name: recipient.view,
      message_header: JSON.stringify({
        from: {
          name: env.SYSTEM_EMAIL_SENDER_NAME,
          address: env.SYSTEM_EMAIL_SENDER_ADDRESS,
        },
        headers: {
          'X-Message-UUID': messageUuid,
        },
      }),
      message_contents: JSON.stringify(recipient.message),
      message_locals: JSON.stringify(mailInfo.locals),
    };

    return emailMessagesRepo.insertEmailMessage(serializedData);
  })
    .then(() => Promise.resolve(true))
    .catch((err) => {
      logger.error('E-mail enqueueing error', err);
      return Promise.resolve(false);
    });
}

async function sendEnqueuedEmails(count = 10, maxRetries = 5) {
  const enqueuedEmails = await emailMessagesRepo.getUnsentEmailMessages(count, maxRetries) || [];

  logger.info(`Sending ${enqueuedEmails.length} enqueued e-mails`);

  return Promise.mapSeries(enqueuedEmails, (emailMessageData) => sendEnqueuedEmail(emailMessageData)
    .then((sendResult) => {
      if (sendResult.success) {
        logger.info(`Successfully sent e-mail message ${emailMessageData.email_message_id}`);
        return emailMessagesRepo.updateEmailMessage(emailMessageData.email_message_id, {
          sent_at: new Date(),
        })
          .then(() => {
            logger.info(`Successfully set e-mail message ${emailMessageData.email_message_id} as being SENT`);
            return Promise.resolve(emailMessageData.email_message_id);
          })
          .catch((err) => {
            logger.warn(`Could not set e-mail message ${emailMessageData.email_message_id} as SENT`, err);
            return Promise.resolve(emailMessageData.email_message_id);
          });
      }

      logger.warn(`Could not send e-mail message ${emailMessageData.email_message_id}`, sendResult.error);
      return emailMessagesRepo.updateEmailMessage(emailMessageData.email_message_id, {
        send_retries: (parseInt(emailMessageData.send_retries, 10) || 0) + 1,
      })
        .then(() => Promise.resolve(false))
        .catch((err) => {
          logger.warn(`Could not increment e-mail message ${emailMessageData.email_message_id} as RETRY FAILED`, err);
          return Promise.resolve(false);
        });
    })
    .catch((err) => {
      logger.warn(`Could not send e-mail message ${emailMessageData.email_message_id} (generic)`, err);
      return Promise.resolve(false);
    })).then((results) => {
    const successfulCount = results.filter((m) => m !== false);
    logger.info(`Successfully sent ${successfulCount.length} e-mail messages out of ${enqueuedEmails.length}`);
    return Promise.resolve(successfulCount.length);
  });
}
