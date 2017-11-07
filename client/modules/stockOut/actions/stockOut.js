export default {
  clearErrors({ LocalState }) {
    LocalState.set('ITEM', null);
    LocalState.set('ITEM_NAME', null);
    LocalState.set('QUANTITY', null);
  },

  selectOption({ LocalState }, selectedOption, type) {
    switch (type) {
      case 'Item':
        LocalState.set('ITEM', selectedOption);
        break;
      case 'Quantity':
        LocalState.set('QUANTITY', selectedOption);
        break;
    }
  },

  submitItem({ LocalState }, item, boxes, callback) {
    Meteor.call('action.stockOutItem', item, boxes, (err) => {
      if (err) {
        callback('err');
        return LocalState.set('STOCK_IN_ERROR', err);
      }
      callback();
    });
  }
}