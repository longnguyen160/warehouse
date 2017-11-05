export default {
  clearErrors({ LocalState }) {
    LocalState.set('SERIES', null);
    LocalState.set('ITEM', null);
    LocalState.set('SHELF', null);
    LocalState.set('ROW', null);
    LocalState.set('COLUMN', null);
  },

  selectOption({ LocalState }, selectedOption, type) {
    switch (type) {
      case 'series':
        LocalState.set('SERIES', selectedOption);
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
    }
  },

  submitItem({ LocalState }, item, status, callback) {
    Meteor.call('action.stockIn', item, status, (err) => {
      if (err) {
        callback('err');
        return LocalState.set('STOCK_IN_ERROR', err);
      }
      callback();
    });
  }
}