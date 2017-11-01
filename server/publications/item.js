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
          return Boxes.find({ _id: { $in: item.boxId } });
        }
      },
      {
        find(item) {
          return Shelves.find({ _id: item.shelfId });
        }
      },
      {
        find(item) {
          return Blocks.find({ _id: item.blockId });
        }
      },
      {
        find(item) {
          return Sections.find({ _id: item.sectionId });
        }
      },
      {
        find(item) {
          return Warehouses.find({ _id: item.warehouseId });
        }
      }
    ]
  }));
}
