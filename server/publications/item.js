import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Categories, Boxes, Shelves, Sections, Blocks, Warehouses } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('getItem', (filter) => ({
    find() {
      check(filter, Object);

      return Items.find(filter);
    },
    children: [
      {
        find(item) {
          return Series.find({ _id: item.seriesId });
        },
        children: [
          {
            find(series) {
              return Categories.find({ _id: {$in: series.categoryId } });
            }
          }
        ]
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          return Boxes.find({ _id: { $in: detail.boxId } });
        }
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          return Shelves.find({ _id: detail.shelfId });
        }
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          return Blocks.find({ _id: detail.blockId });
        }
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          return Sections.find({ _id: detail.sectionId });
        }
      },
      {
        find(item) {
          return Warehouses.find({ _id: Meteor.user().warehouseId });
        }
      }
    ]
  }));

  Meteor.publish('findItem', (name) => {
    check(name, String);

    return Items.find({ name });
  });
}
