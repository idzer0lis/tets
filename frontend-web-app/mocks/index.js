/* eslint-disable object-shorthand */

const userPayload = {
  site_user_id: 1,
  email: 'site@user.id',
  identity_verification_status_code: 'NONE',
};

const loggedInStatus = {
  isLoggedIn: false,
};

export default {

  // basic mock
  'POST /api/login': function (pathMatch, query, request) {
    // before respond, you can check the path and query parameters with `pathMatch` & `query`
    // powered by 'url-pattern' & 'qs'
    // https://www.npmjs.com/package/url-pattern
    // https://www.npmjs.com/package/qs
    if (request.body.email === 'verified@kyc.com') {
      userPayload.identity_verification_status_code = 'VERIFIED';
    } else if (request.body.email === 'rejected@kyc.com') {
      userPayload.identity_verification_status_code = 'REJECTED';
    } else if (request.body.email === 'processing@kyc.com') {
      userPayload.identity_verification_status_code = 'PROCESSING';
    } else {
      userPayload.identity_verification_status_code = 'NONE';
    }

    userPayload.email = request.body.email || 'nobody@mock.com';

    const body = {
      success: request.body.password === 'password1',
      payload: request.body.password === 'password1' ? {
        user: userPayload,
      } : null,
    };

    loggedInStatus.isLoggedIn = true;

    return {
      body: body,
      status: request.body.password === 'password1' ? 200 : 401,
      statusText: request.body.password === 'password1' ? 'OK' : 'Unauthorized',
      headers: {/* headers */},
      delay: 500, // millisecond
    };
  },

  // basic mock
  'POST /api/logout': function (pathMatch, query, request) {
    loggedInStatus.isLoggedIn = false;

    return {
      body: { success: true, payload: null },
      status: 200,
      statusText: 'OK',
      headers: {/* headers */},
      delay: 500, // millisecond
    };
  },

  'GET /api/session': function (pathMatch, query, request) {
    // before respond, you can check the path and query parameters with `pathMatch` & `query`
    // powered by 'url-pattern' & 'qs'
    // https://www.npmjs.com/package/url-pattern
    // https://www.npmjs.com/package/qs
    const body = {
      success: true,
      payload: {
        user: loggedInStatus.isLoggedIn ? userPayload : null,
      },
    };

    return {
      body: body,
      status: 200,
      statusText: 'OK',
      headers: {/* headers */},
      delay: 500, // millisecond
    };
  },
};
