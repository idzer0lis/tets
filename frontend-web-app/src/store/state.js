const state = {
  env: {
    mailchimpSubscribeFormAction: process.env.MAILCHIMP_POST_URL,
  },
  flashMessages: null,
  userCaptcha: null,
  registrationTermsAccepted: false,
  globalActionInProgress: false,
  isLoggedIn: false,
  footerVisible: true,
  user: {
    id: null,
    email: null,
    verificationStatusCode: 'NONE',
    kyc: {
      termsAccepted: false,
      bundleStatusCode: null,
      bundlePayload: {},
      acceptReason: null,
      rejectReason: null,
      fileName: null,
      documentType: null,
      contributionSourceAddress: null,
      contributionContractAddress: null,
      identityRejectReason: null,
      documents: [],
    },
    details: {
      countryOfResidence: null,
      firstName: null,
      lastName: null,
      nationality: null,
    }
  },
  icoContributionSettings: {
    serverCommunicationError: false,
    status: {
      currentStatusName: '',
      nextStatusAt: null,
    },
    contributionLimit: null,
    nextStatusAt: null,
    contributionTotalCap: null,
    totalRaised: null,
    startDate: null,
    endDate: null,
  },
  contribute: {
    contributionContractAddress: null,
    entitledTokensAmount: null,
    ethExchangeRate: null,
    contributionAmount: null,
  },
};

export default state;
