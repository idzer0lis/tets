const roles = require('./roles');
const permissions = require('./permissions');

const roleCodes = Object.keys(roles).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});
const permissionCodes = Object.keys(permissions).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});

const mapping = {
  [roleCodes.ADMIN]: [
    permissionCodes.ACTIVATE_BACKOFFICE_USER,
    permissionCodes.ACTIVATE_SITE_USER,
    permissionCodes.CHANGE_USER_IP_ADDRESS,
    permissionCodes.CREATE_BACKOFFICE_USER,
    permissionCodes.DEACTIVATE_BACKOFFICE_USER,
    permissionCodes.DEACTIVATE_SITE_USER,
    permissionCodes.EDIT_USER_DETAILS,
    permissionCodes.MANAGE_BACKOFFICE_USERS,
    permissionCodes.MANAGE_SITE_USERS,
    permissionCodes.REMOVE_USER_IP_ADDRESS,
  ],
};

module.exports = mapping;
