export default {
  clearErrors({ LocalState }) {
    LocalState.set('OPTION', null);
    LocalState.set('SEARCH_TEXT', null);
  },

  selectOption({ LocalState }, option) {
    LocalState.set('OPTION', option);
  },

  search({ LocalState }, filter) {
    LocalState.set('SEARCH_TEXT', filter);
  }
}