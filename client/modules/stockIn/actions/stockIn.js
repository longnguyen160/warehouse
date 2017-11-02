export default {
  clearErrors({ LocalState }) {
    LocalState.set('SERIES', null);
    LocalState.set('ITEM', null);
  },

  selectSeries({ LocalState }, selectedSeries) {
    LocalState.set('SERIES', selectedSeries);
  },

  getItemDetails({ LocalState }, item) {
    LocalState.set('ITEM', item);
  }
}