/**
 * Created by sandrastoicescu on 27/12/2017.
 */
const { isEmpty } = require('validator');
/* eslint-disable no-param-reassign */
function validateFields(details, fn, fieldName, message = null) {
  if (typeof fn !== 'function') {
    message = fieldName;
    fieldName = fn;
    fn = () => true;
  }

  const f = details.page_contents[fieldName];

  if (!details || typeof f === 'undefined') {
    // Maybe we should throw here
    details.missingFields.push(fieldName);
    details.validationErrors.push(message);
    details.isValid = false;
    return false;
  }

  if (!fn(f)) {
    details.validationErrors.push(message || `Validation failed for field ${fieldName}`);
    details.isValid = false;
    return false;
  }

  if (!(f ? (typeof f === 'string' && !isEmpty(f) ? true : (Array.isArray(f) && f.length > 0)) : false)) { // eslint-disable-line no-nested-ternary
    details.missingFields.push(fieldName);
    details.validationErrors.push(message);
    details.isValid = false;
    return false;
  }
  return true;
}

function validateProjectData(projectDetails) {
  if (typeof projectDetails.isValid !== 'boolean') {
    projectDetails.isValid = true;
  }

  if (!Array.isArray(projectDetails.missingFields)) {
    projectDetails.missingFields = [];
  }

  if (!Array.isArray(projectDetails.validationErrors)) {
    projectDetails.validationErrors = [];
  }

  if (!projectDetails.page_contents) {
    projectDetails.validationErrors.push('You have not entered any details for this project');
    projectDetails.isValid = false;
  } else {
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_header_photo_file_name', 'Missing header photo');
    validateFields(projectDetails, (f) => !isEmpty(f), 'token_type', 'Missing token type');
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_technology', 'Missing technology');
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_short_description', 'Missing short description');
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_start_date', 'Missing start date');
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_end_date', 'Missing end date');
    validateFields(projectDetails, (f) => !isEmpty(f), 'project_token_price', 'Missing token price');
    validateFields(projectDetails, 'project_currencies_accepted', 'Missing or invalid input for accepted currencies');
    validateFields(projectDetails, 'teamMembers', 'Must enter details for at least one team member');
  }
}

module.exports = {
  validateProjectData,
};
