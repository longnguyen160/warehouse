import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockOut from '../components/StockOut';
import moment from 'moment';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let item = LocalState.get('ITEM') || '';
  let quantity = LocalState.get('QUANTITY');
  let itemData = null, boxes = [], shelves = [], blocks = [], sections = [], warehouses = [], actions = [];

  const filter = {
    name: item
  };

  if (Meteor.subscribe('getItem', filter).ready()) {
    itemData = Collections.Items.findOne();
    itemData.details = itemData.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
    boxes = Collections.Boxes.find({ _id: { $in: itemData.details.boxId } }, { sort: { currentQuantity: 1 } }).fetch();
    const shelfIds = boxes.map(box => box.map(element => element.shelfId));
    shelves = shelfIds.map(shelfId =>
      shelfId.map(element =>
        Collections.Shelves.findOne({ _id: element })
      )
    );
    blocks = Collections.Blocks.find({ _id: itemData.details.blockId }).fetch();
    sections = Collections.Sections.find({ _id: itemData.details.sectionId }).fetch();
    warehouses = Collections.Warehouses.find({ _id: itemData.details.warehouseId }).fetch();
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
    shelves,
    blocks,
    sections,
    warehouses,
    actions,
    boxes
  });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.stockOut.clearErrors,
  selectOption: actions.stockOut.selectOption,
  submitItem: actions.stockOut.submitItem,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StockOut);
