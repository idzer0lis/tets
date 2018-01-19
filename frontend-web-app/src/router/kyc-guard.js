import store from '../store';

import * as Uiv from 'uiv';

function kycGuard(to, from, next) {
  if (!store.state.isLoggedIn || !store.state.user) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }

  if (store.state.user.verificationStatusCode !== 'VERIFIED') { // if reinstated, do bear in mind this showed the toast in NONE and REJECTED status, which did not make sense
    Uiv.Notification.notify({
      type: 'info',
      content: 'Thank you for submitting the KYC documents, please allow up to 48 hours to verify your request.',
    });

    return next({
      path: '/kyc/verification',
    });
  }

  return next();
}
