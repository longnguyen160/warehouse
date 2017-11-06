export default {
  clearErrors({ LocalState }) {
    LocalState.set('SERIES', null);
    LocalState.set('ITEM', null);
    LocalState.set('SHELF', null);
    LocalState.set('ROW', null);
    LocalState.set('COLUMN', null);
    LocalState.set('NAME', null);
    LocalState.set('SHELF_SERIES', null);
    LocalState.set('CATEGORY', null);
  },

  selectOption({ LocalState }, selectedOption, type) {
    switch (type) {
      case 'series':
        LocalState.set('SERIES', selectedOption);
        break;
      case 'seriesData':
        LocalState.set('SERIES_DATA', selectedOption);
        break;
      case 'item':
        LocalState.set('ITEM', selectedOption);
        break;
      case 'shelf':
        LocalState.set('SHELF', selectedOption);
        break;
      case 'row':
        LocalState.set('ROW', selectedOption);
        break;
      case 'column':
        LocalState.set('COLUMN', selectedOption);
        break;
      case 'name':
        LocalState.set('NAME', selectedOption);
        break;
      case 'shelves':
        LocalState.set('SHELF_SERIES', selectedOption);
        break;
      case 'category':
        LocalState.set('CATEGORY', selectedOption);
        break;
    }
  },

  submitItem({ LocalState }, item, status, callback) {
    Meteor.call('action.stockInItem', item, status, (err) => {
      if (err) {
        callback('err');
        return LocalState.set('STOCK_IN_ERROR', err);
      }
      callback();
    });
  },

  addSeries({ LocalState }, seriesData, selectedCategories, selectedShelves, callback) {
    Meteor.call('action.stockInSeries', seriesData, selectedCategories, selectedShelves, (err, res) => {
      if (err) {
        callback('err');
        return LocalState.set('STOCK_IN_ERROR', err);
      }
      callback(res);
    });
  }
}