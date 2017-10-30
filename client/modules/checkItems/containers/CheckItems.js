import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import Profile from '../components/CheckItems';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  const option = LocalState.get('OPTION');
  const filter = LocalState.get('SEARCH_TEXT') || {};

  switch (option) {
    case '0':
      if (Meteor.subscribe('getItem', filter).ready()) {
        const items = Collections.Items.find().fetch();
        const seriesId = items.map(item => item.seriesId);
        const series = Collections.Series.find({ _id: { $in: seriesId } }).fetch();
        const boxIds = items.map(item => item.boxId);
        const boxes = boxIds.map(boxId =>
          Collections.Boxes.find({ _id: { $in: boxId } }).fetch()
        );
        const categoryIds = series.map(item => item.categoryId);
        const categories = categoryIds.map(categoryId =>
          Collections.Categories.find({ _id: { $in: categoryId } }).fetch()
        )
        const positionIds = boxes.map(box => box.map(element => element.positionId));
        const positions = positionIds.map(positionId =>
          Collections.Positions.find({ _id: { $in: positionId } }).fetch()
        );
        const shelfIds = series.map(series => series.shelfId);
        const shelves = shelfIds.map(shelfId =>
          Collections.Shelves.find({ _id: { $in: shelfId } }).fetch()
        );
        const blockIds = shelves.map(shelf => shelf.map(element => element.blockId));
        const blocks = blockIds.map(blockId =>
          Collections.Blocks.find({ _id: { $in: blockId } }).fetch()
        );
        const sectionIds = blocks.map(block => block.map(element => element.sectionId));
        const sections = sectionIds.map(sectionId =>
          Collections.Sections.find({ _id: { $in: sectionId } }).fetch()
        );
        const warehouseIds = sections.map(section => section.map(element => element.warehouseId));
        const warehouses = warehouseIds.map(warehouseId =>
          Collections.Warehouses.find({ _id: { $in: warehouseId } }).fetch()
        );
      }
      break;
    case '1':
      break;
    default:
      break;
  }
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  updateUser: actions.profile.updateUser,
  selectOption: actions.checkItems.selectOption,
  clearErrors: actions.profile.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Profile);