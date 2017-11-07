import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Categories, Boxes, Shelves, Sections, Blocks, Warehouses } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('getItem', (filter) => ({
    find() {
      check(filter, Object);

      return Items.find(filter, { sort: { name: 1 } });
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
          if (detail) {
            return Boxes.find({_id: {$in: detail.boxId}});
          }
        },
        children: [
          {
            find(box) {
              return Shelves.find({ _id: box.shelfId });
            }
          },
        ]
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          if (detail) {
            return Blocks.find({_id: detail.blockId});
          }
        }
      },
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          if (detail) {
            return Sections.find({_id: detail.sectionId});
          }
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

  Meteor.publishComposite('getItemStockOut', (name) => ({
    find() {
      check(name, String);

      console.log(Items.find({ name }).fetch());
      return Items.find({ name });
    },
    children: [
      {
        find(item) {
          const detail = item.details.filter(detail => detail.warehouseId === Meteor.user().warehouseId)[0];
          if (detail) {
            return Boxes.find({_id: {$in: detail.boxId}});
          }
        }
      }
    ]
  }));
}
