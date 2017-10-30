export default {
  clearErrors({ LocalState }) {
    LocalState.set('SEARCH', null);
  },

  search({ LocalState }, filter) {
    LocalState.set('SEARCH', filter);
  }

}