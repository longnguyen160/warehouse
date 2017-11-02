import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Categories, Boxes, Shelves, Sections, Blocks, Warehouses } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('showPosition', (seriesId) => ({
    find() {
      check(seriesId, String);

      return Series.find({_id: seriesId});
    },
    children: [
      {
        find(series) {
          return Items.find({ seriesId: series._id });
        },
        children: [
          {
            find(item) {
              return Boxes.find({ _id: { $in: item.boxId } });
            }
          }
        ]
      }
    ]
  }));
}
