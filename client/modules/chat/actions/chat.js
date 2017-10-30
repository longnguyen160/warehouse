export default {
  clearErrors({ LocalState }) {
    LocalState.set('SEND_MESSAGE_ERROR', null);
    LocalState.set('USERID', null);
  },

  sendMessage({ Meteor, LocalState }, toUserId, message) {
    Meteor.call('chat.sendMessage', toUserId, message, (err) => {
      if (err) {
        return LocalState.set('SEND_MESSAGE_ERROR', err.reason);
      }
    });
  },

  chatWithOther({ LocalState }, userId) {
    LocalState.set('USERID', userId);
  }
}