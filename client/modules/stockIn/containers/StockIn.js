import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockIn from '../components/StockIn';
import moment from 'moment';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let selectedOption = LocalState.get('SERIES');
  let seriesData = LocalState.get('SERIES_DATA');
  let itemName = LocalState.get('NAME');
  let itemDetails = LocalState.get('ITEM');
  let selectedShelf = LocalState.get('SHELF');
  let selectedShelfForSeries = LocalState.get('SHELF_SERIES');
  let selectedCategory = LocalState.get('CATEGORY');
  let rowId = LocalState.get('ROW') || '1';
  let columnId = LocalState.get('COLUMN') || '1';
  let series = [], shelves = [], actions = [], box = null;
  let allShelves = [], categories = [];
  let hideInput = false;

  if (Meteor.subscribe('getSeries').ready()) {
    series = Collections.Series.find({}, { sort: { name: 1 } }).fetch();
    if (!selectedOption) {
      selectedOption = series[0]._id;
    }
  }

  if (Meteor.subscribe('getAllShelves').ready()) {
    const sections = Collections.Sections.find({ warehouseId: Meteor.user().warehouseId }).fetch();
    sections.map(section => {
      const blocks = Collections.Blocks.find({ sectionId: section._id }).fetch();
      blocks.map(block => {
        let shelfDatas = Collections.Shelves.find({blockId: block._id}).fetch();
        shelfDatas.map(shelf => {
          shelf.name = section.name + ' - ' + block.name + ' - ' + shelf.name;
          allShelves.push(shelf);
        });
      })
    });
    categories = Collections.Categories.find().fetch();
    if (!selectedCategory) {
      selectedCategory = categories[0]._id;
    }
    if (!selectedShelfForSeries) {
      selectedShelfForSeries = allShelves[0]._id;
    }
  }

  if (itemName && Meteor.subscribe('findItem', itemName).ready()) {
    const item = Collections.Items.findOne({ name: itemName });
    if (item) {
      hideInput = true;
    }
  }

  if (itemDetails && selectedOption !== 'other'
    && Meteor.subscribe('showPositionWithExistedSeries', selectedOption).ready()) {
    const series = Collections.Series.findOne({ _id: selectedOption });
    const seriesLocation = series.shelfIds;
    const shelfIds = seriesLocation.filter(location => location.warehouseId === Meteor.user().warehouseId)[0];

    shelves = Collections.Shelves.find({ _id: { $in: shelfIds.ids } }, { sort: { name: 1 } }).fetch();
    if (!selectedShelf) {
      selectedShelf = shelves[0]._id;
    }
    box = Collections.Boxes.findOne({
      shelfId: selectedShelf,
      rowId,
      columnId
    });
  }

  if (itemDetails && selectedOption === 'other'
    && Meteor.subscribe('showPositionWithNonExistedSeries', seriesData.selectedShelves).ready()) {
    shelves = seriesData.selectedShelves;
    if (!selectedShelf) {
      selectedShelf = shelves[0]._id;
    }
    box = Collections.Boxes.findOne({
      shelfId: selectedShelf,
      rowId,
      columnId
    });
  }

  if (Meteor.subscribe('getInsertedItem').ready()) {
    const action = Collections.Action.find({ type: 'Stock In' }, { sort: { date: -1 } }).fetch();
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
    series,
    selectedOption,
    shelves,
    selectedShelf,
    rowId,
    columnId,
    box,
    hideInput,
    actions,
    allShelves,
    categories,
    selectedShelfForSeries,
    selectedCategory
  });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.stockIn.clearErrors,
  selectOption: actions.stockIn.selectOption,
  submitItem: actions.stockIn.submitItem,
  addSeries: actions.stockIn.addSeries,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StockIn);
