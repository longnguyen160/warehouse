import { Meteor } from 'meteor/meteor';
import { Shelves, Sections, Blocks, Categories } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('getAllShelves', () => ({
    find() {
      return Sections.find({ warehouseId: Meteor.user().warehouseId });
    },
    children: [
      {
        find(section) {
          return Blocks.find({ sectionId: section._id });
        },
        children: [
          {
            find(block) {
              return Shelves.find({ blockId: block._id });
            }
          }
        ]
      },
      {
        find() {
          return Categories.find();
        }
      }
    ]
  }));
}
