export default {
  clearErrors({ LocalState }) {
    LocalState.set('SIGNUP_ERROR', null);
    LocalState.set('SIGNUP_SUCCESS', null);
    LocalState.set('SIGNIN_ERROR', null);
  },

  login({ Meteor, LocalState }, email, password, history, callback) {
    Meteor.loginWithPassword(email, password, (errLogin) => {
      if (errLogin) {
        callback('error');
        return LocalState.set('SIGNIN_ERROR', errLogin.reason);
      }
      return history.push('/');
    });
  },

}