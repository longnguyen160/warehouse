import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items, Series, Categories, Boxes, Positions, Shelves, Sections, Blocks, Warehouses } from '../../lib/collections';

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
        find(item) {
          return Boxes.find({ _id: item.boxId });
        },
        children: [
          {
            find(series) {
              return Categories.find({ _id: series.categoryId });
            },
            find(box) {
              return Positions.find({ _id: box.positionId });
            },
            children: [
              {
                find(position) {
                  return Shelves.find({ _id: position.shelfId });
                },
                children: [
                  {
                    find(shelf) {
                      return Blocks.find({ _id: shelf.blockId });
                    },
                    children: [
                      {
                        find(block) {
                          return Sections.find({ _id: block.sectionId });
                        },
                        children: [
                          {
                            find(section) {
                              return Warehouses.find({ _id: section.warehouseId });
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }));
}