import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import CheckItems from '../components/CheckItems';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  const option = LocalState.get('OPTION') || '0';
  const filter = LocalState.get('SEARCH_TEXT') || {};
  let items = [], series = [], boxes = [], categories = [], positions = [], shelves = [], blocks = [], sections = [], warehouses = [];

  switch (option) {
    case '0':
      if (Meteor.subscribe('getItem', filter).ready()) {
        items = Collections.Items.find().fetch();
        const seriesId = items.map(item => item.seriesId);
        series = Collections.Series.find({ _id: { $in: seriesId } }).fetch();
        const boxIds = items.map(item => item.boxId);
        boxes = boxIds.map(boxId =>
          Collections.Boxes.find({ _id: { $in: boxId } }).fetch()
        );
        const categoryIds = series.map(item => item.categoryId);
        categories = categoryIds.map(categoryId =>
          Collections.Categories.find({ _id: { $in: categoryId } }).fetch()
        )
        const shelfIds = boxes.map(box => box.shelfId);
        shelves = shelfIds.map(shelfId =>
          Collections.Shelves.find({ _id: { $in: shelfId } }).fetch()
        );
        const blockIds = shelves.map(shelf => shelf.map(element => element.blockId));
        blocks = blockIds.map(blockId =>
          Collections.Blocks.find({ _id: { $in: blockId } }).fetch()
        );
        const sectionIds = blocks.map(block => block.map(element => element.sectionId));
        sections = sectionIds.map(sectionId =>
          Collections.Sections.find({ _id: { $in: sectionId } }).fetch()
        );
        const warehouseIds = sections.map(section => section.map(element => element.warehouseId));
        warehouses = warehouseIds.map(warehouseId =>
          Collections.Warehouses.find({ _id: { $in: warehouseId } }).fetch()
        );
      }
      break;
    case '1':
      break;
    default:
      break;
  }

  onData(null, { items, series, categories, boxes, positions, shelves, blocks, sections, warehouses });
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
