import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockIn from '../components/StockIn';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let selectedOption = LocalState.get('SERIES');
  let itemName = LocalState.get('NAME');
  let itemDetails = LocalState.get('ITEM');
  let selectedShelf = LocalState.get('SHELF');
  let rowId = LocalState.get('ROW') || '1';
  let columnId = LocalState.get('COLUMN') || '1';
  let series = [], shelves = [], box = null;
  let hideInput = false;

  if (Meteor.subscribe('getSeries').ready()) {
    series = Collections.Series.find({}).fetch();
    if (!selectedOption) {
      selectedOption = series[0]._id;
    }
  }

  if (itemName && Meteor.subscribe('findItem', itemName).ready()) {
    const item = Collections.Items.findOne({ name: itemName });
    if (item) {
      hideInput = true;
    }
  }

  if (itemDetails && Meteor.subscribe('showPosition', selectedOption).ready()) {
    const seriesLocation = Collections.Series.findOne({ _id: selectedOption }).shelfIds;
    const shelfIds = seriesLocation.filter(location => location.warehouseId === Meteor.user().warehouseId)[0];
    shelves = Collections.Shelves.find({ _id: { $in: shelfIds.ids } }, { $sort: { name: 1 } }).fetch();
    if (!selectedShelf) {
      selectedShelf = shelves[0]._id;
    }
    box = Collections.Boxes.findOne({
      shelfId: selectedShelf,
      rowId,
      columnId
    });
  }

  onData(null, { series, selectedOption, shelves, selectedShelf, rowId, columnId, box, hideInput });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.stockIn.clearErrors,
  selectOption: actions.stockIn.selectOption,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StockIn);
