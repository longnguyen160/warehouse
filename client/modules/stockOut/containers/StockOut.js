import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockOut from '../components/StockOut';
import moment from 'moment';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let item = LocalState.get('ITEM');
  let quantity = LocalState.get('QUANTITY');
  let itemData = null, boxes = [], actions = [];

  if (item && Meteor.subscribe('getItemStockOut', item).ready()) {
    itemData = Collections.Items.findOne();
    itemData.details = itemData.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
    boxes = Collections.Boxes.find({ _id: { $in: itemData.details.boxId } }, { sort: { currentQuantity: 1 } }).fetch();
    if (quantity < itemData.details.quantity) {
      let remainQuantity = quantity;
      boxes = boxes.filter(box => {
        if (remainQuantity > 0 && remainQuantity > box.currentQuantity) {
          remainQuantity -= box.currentQuantity;
          return box;
        } else if (remainQuantity > 0 && remainQuantity < box.currentQuantity) {
          box.currentQuantity -= remainQuantity;
          remainQuantity = 0;
          return box;
        }
      });
    }
  }

  if (Meteor.subscribe('actionStockOut').ready()) {
    const action = Collections.Action.find({ type: 'Stock out'}, { sort: { date: -1 } }).fetch();
    let date = '';
    const itemIds = action.map(element => element.itemId);
    const items = itemIds.map(itemId =>
      Collections.Items.findOne({ _id: itemId })
    );
    action.map((element, index) => {
      if (moment(element.date).format("D/M/Y") !== date) {
        date = moment(element.date).format("D/M/Y");
        actions.push({
          date,
          action: [
            {
              name: items[index].name,
              quantity: element.quantity
            }
          ]
        });
      } else {
        actions[actions.length - 1].action.push({
          name: items[index].name,
          quantity: element.quantity
        });
      }
    });
  }

  onData(null, {
    actions,
    itemData,
    boxes
  });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.stockOut.clearErrors,
  selectOption: actions.stockOut.selectOption,
  stockOutItem: actions.stockOut.stockOutItem,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StockOut);
