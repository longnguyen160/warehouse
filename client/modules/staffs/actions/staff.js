export default {
  addUser({ Meteor, LocalState }, data, history, callback) {
    Meteor.call('account.addUser', data, (err) => {
      console.log(err)
    });
  },

  removeUser({ Meteor, LocalState }, userId) {
    Meteor.call('account.removeUser', userId, (err) => {
      console.log(err)
    });
  }
}