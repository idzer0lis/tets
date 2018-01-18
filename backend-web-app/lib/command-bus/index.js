const cc = require('change-case');

const logger = require('../helpers/logger');

const registeredCommands = {
  ACTIVATE_BACKOFFICE_USER: 'ACTIVATE_BACKOFFICE_USER',
  ACTIVATE_SITE_USER: 'ACTIVATE_SITE_USER',
  CREATE_BACKOFFICE_USER: 'CREATE_BACKOFFICE_USER',
  CREATE_SITE_USER: 'CREATE_SITE_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGOUT_SITE_USER: 'LOGOUT_SITE_USER',
  SEND_BACKOFFICE_USER_ACTIVATION_EMAIL: 'SEND_BACKOFFICE_USER_ACTIVATION_EMAIL',
  SET_USER_REMEMBER_ME: 'SET_USER_REMEMBER_ME',
  INITIALIZE_SITE_USER_PASSWORD_RESET: 'INITIALIZE_SITE_USER_PASSWORD_RESET',
  SEND_LOGIN_EMAIL_NOTIFICATION: 'SEND_LOGIN_EMAIL_NOTIFICATION',
  SEND_SITE_USER_ACTIVATION_EMAIL: 'SEND_SITE_USER_ACTIVATION_EMAIL',
  SEND_SITE_USER_PASSWORD_CHANGE_NOTIFICATION_EMAIL: 'SEND_SITE_USER_PASSWORD_CHANGE_NOTIFICATION_EMAIL',
  SEND_SITE_USER_PASSWORD_RESET_EMAIL: 'SEND_SITE_USER_PASSWORD_RESET_EMAIL',
  SEND_SITE_USER_PASSWORD_RESET_NOTIFICATION_EMAIL: 'SEND_SITE_USER_PASSWORD_RESET_NOTIFICATION_EMAIL',
  RESEND_SITE_USER_ACTIVATION_EMAIL: 'RESEND_SITE_USER_ACTIVATION_EMAIL',
  RESET_SITE_USER_PASSWORD: 'RESET_SITE_USER_PASSWORD',
};

const commandNames = Object.keys(registeredCommands);

/**
 *
 * @param command
 * @param context
 * @param payload
 * @returns {Promise.<{ result: <*>, error: Error }>}
 */
async function handle(command, context, payload) {
  function handleCommandOnNextTick(handler) {
    let resolver;

    const p = new Promise((resP) => {
      resolver = resP;
    });

    process.nextTick(async () => {
      try {
        const result = await handler.handle(context || {}, payload, { handle });
        return resolver({ result, error: null });
      } catch (err) {
        return resolver({ result: null, error: err });
      }
    });

    return p;
  }

  if (cc.constantCase(command) !== command) {
    return Promise.reject(new Error(`Invalid command name: ${command}`));
  }

  if (commandNames.indexOf[command] === -1) {
    return Promise.reject(new Error(`Unknown command: ${command}`));
  }

  try {
    // For now, load the command handlers on-demand
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const commandHandler = require(`./command-handlers/${cc.paramCase(command)}`);
    logger.debug(`Handling command ${command}`);
    try {
      // If no context is provided, send an empty object since destructuring will occur
      const { result, error } = await handleCommandOnNextTick(commandHandler);
      if (error) {
        logger.warn(`Handling of command ${command} failed`, error);
      }

      return Promise.resolve({ result, error });
    } catch (err) {
      logger.error(`Handling of command ${command} failed WITH EXCEPTION; this should not have happened, considering command contract`, err);
      return Promise.reject(err);
    }
  } catch (err) {
    logger.error('Error logged in command: ', err);
    return Promise.reject(new Error(`Command handler could not be loaded for command: ${command}`));
  }
}

module.exports = {
  handle,
  commands: registeredCommands,
};
