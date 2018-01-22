const API_ROOT_URL = process.env.API_ROOT_URL || '';

export const logIn = async ({ commit }, {
  email, password, gRecaptchaResponse, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/login', {
      email,
      password,
      gRecaptchaResponse,
    });
    if (body.success) {
      $notify({
        type: 'success',
        content: 'You have been successfully logged in',
      });

      commit('LOG_IN', { user: body.payload.user, userDetails: body.payload.userDetails, settings: body.payload.icoContributionSettings });
      $router.push(redirect || '/ico/contribute');
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    if ([400, 401].indexOf(err.status) !== -1) {
      $notify({
        type: 'danger',
        content: err.body.message,
      });
    } else {
      $notify({
        type: 'danger',
        content: 'An error has occurred! Please try again!',
      });
      console.error(err);
    }
  }

  commit('END_GLOBAL_ACTION');
};

export const setTermsAccepted = async ({ commit }, { accepted }) => {
  commit('TERMS_ACCEPTED', { accepted });
};

export const setFooterVisible = async ({ commit }, { visible }) => {
  commit('FOOTER_VISIBLE', { visible });
};

export const getKyc = async ({ commit, state }, { $http }) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.get(API_ROOT_URL + '/api/kyc');
    if (body.success) {
      if (body.payload && state.user.id === body.payload.site_user_id) {
        commit('KYC', body.payload);
      } else if (!body.payload) {
        commit('KYC', {});
      }
    }
  } catch (err) {
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const getSession = async ({ commit, state }, { $http }) => {
  try {
    const { body } = await $http.get(API_ROOT_URL + '/api/session');
    if (body.success) {
      if (body.payload.user && state.user.id !== body.payload.user.site_user_id) {
        commit('LOG_IN', { user: body.payload.user, userDetails: body.payload.userDetails, settings: body.payload.icoContributionSettings });
      } else if (!body.payload.user) {
        commit('LOG_OUT');
      } else {
        commit('UPDATE_SESSION', { user: body.payload.user, userDetails: body.payload.userDetails, settings: body.payload.icoContributionSettings });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const logOut = async ({ commit }, { $http, $notify }) => {
  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/logout');
    if (body.success) {
      $notify({
        type: 'success',
        content: body.message,
      });
      commit('LOG_OUT');
      commit('KYC', {});
    }
  } catch (err) {
    console.error(err);
  }
};

export const submitKyc = async ({ commit }, {
  $http, $notify,
  first_name,
  last_name,
  gender,
  date_of_birth,
  nationality,
  country_of_residence,
  home_address,
  postal_code,
  contribution_source_address,
  identity_document_file,
  identity_document_type,
  identity_document_number,
  proof_of_residence_file,
  proof_of_residence_document_type
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const data = new FormData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('gender', gender);
    data.append('date_of_birth', date_of_birth);
    data.append('nationality', nationality);
    data.append('country_of_residence', country_of_residence);
    data.append('home_address', home_address);
    data.append('postal_code', postal_code);
    data.append('contribution_source_address', contribution_source_address);
    data.append('identity_document_type', identity_document_type);
    data.append('identity_document_number', identity_document_number);
    data.append('identity_document_file', identity_document_file);

    if (proof_of_residence_file !== null) {
      data.append('proof_of_residence_file', proof_of_residence_file);
      data.append('proof_of_residence_document_type', proof_of_residence_document_type);
    }

    const { body } = await $http.post(API_ROOT_URL + '/api/kyc', data);
    if (body.success) {
      $notify({
        type: 'success',
        content: body.message,
      });
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    let errorMessage = 'There was an error submitting the Identity Verification information. Please try again!';
    if (err.status === 413) {
      errorMessage = 'The files you have attached are too large. Please limit the maximum total file size to 30MB.'
    } else if (err.body && err.body.message) {
      errorMessage = err.body.message;
    }

    $notify({
      type: 'danger',
      content: errorMessage,
    });
  }

  commit('END_GLOBAL_ACTION');
};

export const confirmAccount = async ({} = {}, { $http, $router, $notify, code, redirect = null }) => {
  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/activate', { code });
    $notify({
      type: body.success,
      content: body.message,
    });

    $router.push(redirect || '/login');
  } catch (err) {
    $notify({
      type: 'error',
      content: 'An error has occurred! Please try again!',
    });

    $router.push(redirect || '/');
  }
};

export const checkEtheriumAddress = async ({ commit }, {
  etherium_address, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/check-etherium-address', {
      etherium_address,
    });

    if (!Array.isArray(body.message)) {
      body.message = [body.message]
    }

    if (body.success) {
      body.message.forEach((message) => {
        $notify({
          type: 'success',
          content: message,
        });
      });

      commit('ETHERIUM_ADDRESS_CHECK', true);
    } else {
      body.message.forEach((message) => {
        $notify({
          type: 'danger',
          content: message,
        });
      });

      commit('ETHERIUM_ADDRESS_CHECK', false);

    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};


export const register = async ({ commit }, {
  email, password, confirm_password, gRecaptchaResponse, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/register', {
      email,
      password,
      confirm_password,
      gRecaptchaResponse,
    });

    if (!Array.isArray(body.message)) {
      body.message = [body.message]
    }

    if (body.success) {
      body.message.forEach((message) => {
        $notify({
          type: 'success',
          content: message,
        });
      });
      commit('SET_FLASH_MESSAGES', body.message);
      $router.push(redirect || '/login');

    } else {
      body.message.forEach((message) => {
          $notify({
            type: 'danger',
            content: message,
          });
        });
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const recoverPassword = async ({ commit }, {
  email, gRecaptchaResponse, $http, $notify,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/recover-password', {
      email,
      gRecaptchaResponse,
    });
    if (body.success === true) {
      $notify({
        type: 'success',
        content: body.message,
      });
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const resetPassword = async ({ commit }, {
  password, confirm_password, password_reset_code, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/reset-password', {
      password,
      confirm_password,
      password_reset_code,
    });
    if (body.success) {
      $notify({
        type: 'success',
        content: body.message,
      });

      $router.push(redirect || '/login');
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const startGlobalAction = async ({ commit }) => {
  commit('START_GLOBAL_ACTION');
};

export const endGlobalAction = async ({ commit }) => {
  commit('END_GLOBAL_ACTION');
};

export const verification = async ({ commit }, {
  first_name, last_name, nationality, country_of_residence, contribution_source_address, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/kyc', {
      first_name,
      last_name,
      nationality,
      country_of_residence,
      contribution_source_address,
    });
    if (body.success) {
      $notify({
        type: 'success',
        content: body.message,
      });

      $router.push(redirect || '/verification');
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const changePassword = async ({ commit }, {
  current_password, password, confirm_password, $http, $router, $notify, redirect = null,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/change-password/', {
      current_password,
      password,
      confirm_password,
    });
    if (body.success) {
      $notify({
        type: 'success',
        content: body.message,
      });

      $router.push(redirect || '/profile');
    } else {
      $notify({
        type: 'danger',
        content: body.message,
      });
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const getContributeData = async ({ commit, state }, { $http }) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.get(API_ROOT_URL + '/api/contribute');
    if (body.success) {
      if (body.payload && state.user.id === body.payload.site_user_id) {
        commit('CONTRIBUTE', body.payload);
      } else if (!body.payload) {
        commit('CONTRIBUTE', {});
      }
    }
  } catch (err) {
    console.error(err);
  }

  commit('END_GLOBAL_ACTION');
};

export const contactSubmit = async ({ commit }, {
  name, email, phone, gRecaptchaResponse, message, $http, $notify,
}) => {
  commit('START_GLOBAL_ACTION');

  try {
    const { body } = await $http.post(API_ROOT_URL + '/api/contact', {
      name,
      email,
      phone,
      message,
      gRecaptchaResponse,
    });
    if (body.success) {
    //   $notify({ // success toast replaced with success alert in component
    //     type: 'success',
    //     content: body.message,
    //   });
      commit('END_GLOBAL_ACTION');

      return Promise.resolve({success:true})
    } else {
    // if (!body.success) {
      $notify({
        type: 'danger',
        content: body.message,
      });
      commit('END_GLOBAL_ACTION');

      return Promise.resolve({ success:false })
    }
  } catch (err) {
    $notify({
      type: 'danger',
      content: 'An error has occurred! Please try again!',
    });
    console.error(err);
    commit('END_GLOBAL_ACTION');

    return Promise.resolve({ success:false })
  }

};

export const setCaptcha = ({ commit }, { response }) => {
  commit('SET_CAPTCHA', response);
};

export const setRegistrationTermsAccepted = ({ commit }, { accepted }) => {
  commit('SET_REGISTRATION_TERMS_ACCEPTED', accepted);
};
