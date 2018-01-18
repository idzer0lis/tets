export const verificationReadOnly = state => (state.user.verificationStatusCode === 'PROCESSING' || state.user.verificationStatusCode === 'VERIFIED');

export const verificationUploadActive = state => (!(state.user.verificationStatusCode === 'PROCESSING' || state.user.verificationStatusCode === 'VERIFIED') && !state.globalActionInProgress);

export const navbarEntriesVisible = state => !(state.route.path.indexOf('/login') === 0 ||
    state.route.path.indexOf('/register') === 0 ||
    state.route.path.indexOf('/recover-password') === 0 ||
    state.route.path.indexOf('/reset-password') === 0);
