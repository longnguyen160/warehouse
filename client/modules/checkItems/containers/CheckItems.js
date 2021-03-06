import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import CheckItems from '../components/CheckItems';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  const option = LocalState.get('OPTION') || '0';
  const filter = LocalState.get('SEARCH_TEXT') || {};
  let items = [], series = [], boxes = [], categories = [], shelves = [], blocks = [], sections = [], warehouses = [];

  switch (option) {
    case '0':
      if (Meteor.subscribe('getItem', filter).ready()) {
        items = Collections.Items.find().fetch();
        items = items.filter(item => {
          item.details = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          if (item.details)
            return item;
        });
        const seriesId = items.map(item => item.seriesId);
        series = seriesId.map(element =>
          Collections.Series.findOne({ _id: element })
        );
        const categoryIds = series.map(series => series.categoryId);
        categories = categoryIds.map(categoryId =>
          Collections.Categories.find({ _id: { $in: categoryId } }).fetch()
        );
        const boxIds = items.map(item => item.details.boxId);
        boxes = boxIds.map(boxId =>
          Collections.Boxes.find({ _id: { $in: boxId } }).fetch()
        );
        const shelfIds = boxes.map(box => box.map(element => element.shelfId));
        shelves = shelfIds.map(shelfId =>
          shelfId.map(element =>
            Collections.Shelves.findOne({ _id: element })
          )
        );
        const blockIds = items.map(item => item.details.blockId);
        blocks = blockIds.map(blockId =>
          Collections.Blocks.find({ _id: blockId }).fetch()
        );
        const sectionIds = items.map(item => item.details.sectionId);
        sections = sectionIds.map(sectionId =>
          Collections.Sections.find({ _id: sectionId }).fetch()
        );
        const warehouseIds = items.map(item => item.details.warehouseId);
        warehouses = warehouseIds.map(warehouseId =>
          Collections.Warehouses.find({ _id: warehouseId }).fetch()
        );
      }
      break;
    case '1':
      break;
    default:
      break;
  }

  onData(null, { items, series, categories, boxes, shelves, blocks, sections, warehouses });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  selectOption: actions.checkItems.selectOption,
  search: actions.checkItems.search,
  clearErrors: actions.checkItems.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CheckItems);
