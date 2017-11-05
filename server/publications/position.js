import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Boxes, Shelves } from '../../lib/collections';

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
        }
      },
      {
        find(series) {
          const shelfIds = series.shelfIds.filter(element => element.warehouseId === Meteor.user().warehouseId);

          return Shelves.find({ _id: { $in: shelfIds[0].ids }});
        },
        children: [
          {
            find(shelf) {
              return Boxes.find({ shelfId: shelf._id });
            }
          }
        ]
      }
    ]
  }));
}
