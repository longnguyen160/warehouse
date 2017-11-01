export default {
  clearErrors({ LocalState }) {
    LocalState.set('SEND_MESSAGE_ERROR', null);
    LocalState.set('USERID', null);
  }
}