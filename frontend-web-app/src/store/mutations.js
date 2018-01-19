/* eslint-disable camelcase,no-param-reassign */
export const START_GLOBAL_ACTION = (state) => {
  state.globalActionInProgress = true;
};

export const END_GLOBAL_ACTION = (state) => {
  state.globalActionInProgress = false;
};

export const TERMS_ACCEPTED = (state, { accepted }) => {
  state.user.kyc.termsAccepted = accepted;
};

export const FOOTER_VISIBLE = (state, { visible }) => {
  state.footerVisible = visible;
};

export const LOG_IN = (state, { user, settings }) => {
  state.isLoggedIn = true;
  state.user.id = user.site_user_id;
  state.user.email = user.email;
  state.user.verificationStatusCode = user.identity_verification_status_code;
  state.icoContributionSettings.status = settings && settings.status ? settings.status : {};
  state.icoContributionSettings.contributionLimit = settings !== null ? settings.user_contribution_limit : null;
  state.icoContributionSettings.startDate = settings !== null ? settings.start_date : null;
  state.icoContributionSettings.endDate = settings !== null ? settings.end_date : null;
  state.icoContributionSettings.nextStatusAt = settings && settings.status ? settings.status.nextStatusAt : null;
  state.icoContributionSettings.contributionTotalCap = settings !== null ? settings.contribution_total_cap : null;
  state.icoContributionSettings.totalRaised = settings !== null ? settings.total_raised : null;
  state.icoContributionSettings.serverCommunicationError = settings !== null ? settings.serverCommunicationError : true;
};

export const LOG_OUT = (state) => {
  state.isLoggedIn = false;
  state.user.id = null;
  state.user.email = null;
  state.user.verificationStatusCode = null;

  state.user.details.countryOfResidence = null;
  state.user.details.firstName = null;
  state.user.details.lastName = null;
  state.user.details.nationality = null;

  state.icoContributionSettings.status = {};
  state.icoContributionSettings.contributionLimit = null;
  state.icoContributionSettings.startDate = null;
  state.icoContributionSettings.endDate = null;
  state.icoContributionSettings.nextStatusAt = null;
  state.icoContributionSettings.contributionTotalCap = null;
  state.icoContributionSettings.totalRaised = null;
  state.icoContributionSettings.serverCommunicationError = false;
};

export const UPDATE_SESSION = (state, { user, userDetails, settings }) => {
  state.isLoggedIn = user !== null;
  state.user.id = user !== null ? user.site_user_id : null;
  state.user.email = user !== null ? user.email : null;
  state.user.verificationStatusCode = user !== null ? user.identity_verification_status_code : null;
  state.user.details.countryOfResidence = userDetails !== null ? userDetails.country_of_residence : null;
  state.user.details.firstName = userDetails !== null ? userDetails.first_name : null;
  state.user.details.lastName = userDetails !== null ? userDetails.last_name : null;
  state.user.details.nationality = userDetails !== null ? userDetails.nationality : null;

  const mappedSettings = Object.assign({
    status: {
      // Set the default status as the most restrictive one
      currentStatusName: 'LIMBO2',
      nextStatusAt: null,
    },
    user_contribution_limit: -1,
    start_date: null,
    end_date: null,
    contribution_total_cap: -1,
    total_raised: -1,
    serverCommunicationError: false,
  }, settings || { serverCommunicationError: true });

  state.icoContributionSettings.status = mappedSettings.status;
  state.icoContributionSettings.contributionLimit = mappedSettings.user_contribution_limit;
  state.icoContributionSettings.startDate = mappedSettings.start_date;
  state.icoContributionSettings.endDate = mappedSettings.end_date;
  state.icoContributionSettings.nextStatusAt = mappedSettings.status ? mappedSettings.status.nextStatusAt : null;
  state.icoContributionSettings.contributionTotalCap = mappedSettings.contribution_total_cap;
  state.icoContributionSettings.totalRaised = mappedSettings.total_raised;
  state.icoContributionSettings.serverCommunicationError = mappedSettings.serverCommunicationError;
};

export const KYC = (state, {
  site_user_kyc_bundle_status_code = null,
  kyc_bundle_payload = null,
  accept_reason = null,
  reject_reason = null,
  original_file_name = null,
  document_type = null,
  document_number = null,
  contribution_source_address = null,
  identity_verification_status_code_reason = '',
  documents = [],
}) => {
  state.user.kyc.bundleStatusCode = site_user_kyc_bundle_status_code;
  state.user.kyc.acceptReason = accept_reason;
  state.user.kyc.rejectReason = reject_reason;
  state.user.kyc.fileName = original_file_name;
  state.user.kyc.documentType = document_type;
  state.user.kyc.documentNumber = document_number;
  state.user.kyc.contributionSourceAddress = contribution_source_address;
  state.user.kyc.bundlePayload = kyc_bundle_payload || {};
  state.user.kyc.identityRejectReason = identity_verification_status_code_reason;
  state.user.kyc.documents = [].concat(documents) || [];
};

export const CONTRIBUTE = (state, { contribution_contract_address, entitled_tokens_amount, eth_exchange_rate, contribution_amount }) => {
  state.contribute.contributionContractAddress = contribution_contract_address !== null ? contribution_contract_address : null;
  state.contribute.entitledTokensAmount = entitled_tokens_amount !== null ? entitled_tokens_amount : null;
  state.contribute.ethExchangeRate = eth_exchange_rate !== null ? eth_exchange_rate : null;
  state.contribute.contributionAmount = contribution_amount !== null ? contribution_amount : null;
};

export const SET_CAPTCHA = (state, response) => {
  state.userCaptcha = response !== null ? response : null;
};

export const SET_REGISTRATION_TERMS_ACCEPTED = (state, accepted) => {
  state.registrationTermsAccepted = !!accepted;
};

export const SET_FLASH_MESSAGES = (state, messages) => {
  state.flashMessages = messages ? messages : null;
};
