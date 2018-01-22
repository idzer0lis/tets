
module.exports = function response(state, message, body) {
  return {
    success: state,
    message,
    payload: body,
  };
};
