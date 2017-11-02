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

  createUser({ Meteor, LocalState }, data, history, callback) {
    Meteor.call('account.createUser', data, (err) => {
      if (err) {
        callback('error');
        return LocalState.set('SIGNUP_ERROR', err.reason);
      }
      Meteor.loginWithPassword(data.email, data.password, (error) => {
        if (error) {
          callback('error');
          return LocalState.set('SIGNUP_ERROR', err.reason);
        }
        return history.push('/');
      });
    });
  }

}