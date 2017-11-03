import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockIn from '../components/StockIn';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let selectedOption = LocalState.get('SERIES');
  let itemDetails = LocalState.get('ITEM');
  let selectedShelf = LocalState.get('SHELF');
  let rowId = LocalState.get('ROW') || '1';
  let columnId = LocalState.get('COLUMN') || '1';
  let series = [], shelves = [], box = null;

  if (Meteor.subscribe('getSeries').ready()) {
    series = Collections.Series.find({}).fetch();
    if (!selectedOption) {
      selectedOption = series[0]._id;
    }
  }

  if (itemDetails && Meteor.subscribe('showPosition', selectedOption).ready()) {
    const item = Collections.Items.findOne({ name: itemDetails.item });
    if (!item) {
      shelves = Collections.Shelves.find({}, { $sort: { name: 1 } }).fetch();
      if (!selectedShelf) {
        selectedShelf = shelves[0]._id;
      }
      box = Collections.Boxes.findOne({
        shelfId: selectedShelf,
        rowId,
        columnId
      });
    }
  }

  onData(null, { series, selectedOption, shelves, selectedShelf, rowId, columnId, box });
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
