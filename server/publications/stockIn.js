import { Meteor } from 'meteor/meteor';
import { Action, Items } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('getInsertedItem', () => ({
    find() {
      return Action.find();
    },
    children: [
      {
        find(action) {
          return Items.find({ _id: action.itemId });
        }
      }
    ]
  }));
}
