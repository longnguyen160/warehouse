import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Categories, Boxes, Shelves, Sections, Blocks, Warehouses } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('showPosition', (seriesId) => ({
    find() {
      check(seriesId, String);

      return Series.find({ _id: seriesId });
    },
    children: [
      {
        find(series) {
          return Items.find({ seriesId: series._id });
        },
        children: [
          {
            find(item, series) {
              const shelfIds = series.shelfIds.filter(element => element.warehouseId === Meteor.user().warehouseId);

              return Shelves.find({ _id: { $in: shelfIds[0].ids }});
            },
            children: [
              {
                find(shelf, item, series) {
                  return Boxes.find({ shelfId: shelf._id });
                }
              }
            ]
          }
        ]
      }
    ]
  }));
}
