import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import StockIn from '../components/StockIn';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Collections } = context();
  let selectedOption = LocalState.get('SERIES');
  let itemDetails = LocalState.get('ITEM');
  let series = [];

  if (Meteor.subscribe('getSeries').ready()) {
    series = Collections.Series.find({}).fetch();
    if (!selectedOption) {
      selectedOption = series[0]._id;
    }
  }

  if (itemDetails && Meteor.subscribe('showPosition', selectedOption).ready()) {
    const series = Collections.Series.findOne({ _id: selectedOption });
    const item = Collections.Items.findOne({ name: itemDetails.item });
    if (!item) {
      const items = Collections.Items.find({ seriesId: selectedOption }, { $sort: { name: -1 } }).fetch();
      const boxIds = items.map(item => item.boxId);
      const boxes = boxIds.map(boxId =>
        Collections.Boxes.find({ _id: { $in: boxId } }).fetch()
      );
    }
  }

  onData(null, { series, selectedOption });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.stockIn.clearErrors,
  selectSeries: actions.stockIn.selectSeries,
  getItemDetails: actions.stockIn.getItemDetails,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StockIn);
