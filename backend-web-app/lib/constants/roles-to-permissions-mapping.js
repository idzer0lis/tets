const roles = require('./roles');
const permissions = require('./permissions');

const roleCodes = Object.keys(roles).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});
const permissionCodes = Object.keys(permissions).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});

const mapping = {
  [roleCodes.ADMIN]: [
    permissionCodes.CREATE_ADMIN,
    permissionCodes.SPONSOR_APPROVE_ICO_PROJECT,
    permissionCodes.SPONSOR_REJECT_ICO_PROJECT,
    permissionCodes.GBX_APPROVE_ICO_PROJECT,
    permissionCodes.GBX_REJECT_ICO_PROJECT,
    permissionCodes.ACTIVATE_BACKOFFICE_USER,
    permissionCodes.DEACTIVATE_BACKOFFICE_USER,
    permissionCodes.MANAGE_SITE_USERS,
    permissionCodes.ACTIVATE_SITE_USER,
    permissionCodes.DEACTIVATE_SITE_USER,
    permissionCodes.KYC_VIEW_DETAILS,
    permissionCodes.KYC_APPROVE_USER,
    permissionCodes.KYC_REJECT_USER,
    permissionCodes.KYC_MODIFY_ERC_ADDRESS,
    permissionCodes.CHANGE_SITE_USER_EMAIL,
    permissionCodes.EDIT_SITE_USER_DETAILS,
    permissionCodes.CHANGE_USER_IP_ADDRESS,
    permissionCodes.REMOVE_USER_IP_ADDRESS,
    permissionCodes.EDIT_USER_DETAILS,
    permissionCodes.PREVIEW_ANY_ICO_PROJECT,
    permissionCodes.MANAGE_BACKOFFICE_USERS,
    permissionCodes.MANAGE_ICO_PROJECTS,
    permissionCodes.TOGGLE_ICO_PROJECT_RECOMMENDED_STATE,
    permissionCodes.EXPORT_SITE_USER_EXCEL,
  ],
  [roleCodes.KYC_OFFICER]: [
    permissionCodes.MANAGE_SITE_USERS,
    permissionCodes.KYC_VIEW_DETAILS,
    permissionCodes.KYC_APPROVE_USER,
    permissionCodes.KYC_REJECT_USER,
  ],
  [roleCodes.TOKEN_ISSUER]: [
    permissionCodes.CREATE_ICO_PROJECT,
    permissionCodes.EDIT_ICO_PROJECT,
    permissionCodes.SUBMIT_ICO_PROJECT,
    permissionCodes.WITHDRAW_ICO_PROJECT,
    permissionCodes.MANAGE_ICO_PROJECTS,
  ],
  [roleCodes.CS_LEVEL_1]: [
    permissionCodes.KYC_VIEW_DETAILS,
    permissionCodes.KYC_APPROVE_USER,
    permissionCodes.KYC_REJECT_USER,
    permissionCodes.MANAGE_SITE_USERS,
  ],
  [roleCodes.CS_LEVEL_2]: [
    permissionCodes.KYC_VIEW_DETAILS,
    permissionCodes.KYC_APPROVE_USER,
    permissionCodes.KYC_REJECT_USER,
    permissionCodes.MANAGE_SITE_USERS,
    permissionCodes.KYC_MODIFY_ERC_ADDRESS,
    permissionCodes.CHANGE_SITE_USER_EMAIL,
    permissionCodes.EDIT_SITE_USER_DETAILS,
    permissionCodes.EDIT_USER_DETAILS,
    permissionCodes.EXPORT_SITE_USER_EXCEL,
  ],
  [roleCodes.ICO_LISTING_OFFICER]: [
    permissionCodes.MANAGE_ICO_PROJECTS,
    permissionCodes.GBX_APPROVE_ICO_PROJECT,
    permissionCodes.GBX_REJECT_ICO_PROJECT,
    permissionCodes.PREVIEW_ANY_ICO_PROJECT,
    permissionCodes.TOGGLE_ICO_PROJECT_RECOMMENDED_STATE,
  ],
  [roleCodes.SPONSOR_FIRM]: [
    permissionCodes.MANAGE_OWN_TOKEN_ISSUERS,
    permissionCodes.INVITE_TOKEN_ISSUER,
    permissionCodes.CREATE_TOKEN_ISSUER,
    permissionCodes.MANAGE_ICO_PROJECTS,
    permissionCodes.SPONSOR_APPROVE_ICO_PROJECT,
    permissionCodes.SPONSOR_REJECT_ICO_PROJECT,
    permissionCodes.PREVIEW_SPONSORED_ICO_PROJECT,
  ],
};

module.exports = mapping;
