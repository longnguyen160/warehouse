import { Meteor } from 'meteor/meteor';
import { Action, Items } from '../../lib/collections';

export default function () {
  Meteor.publishComposite('getInsertedItem', () => ({
    find() {
      return Action.find({ type: 'Stock In' }, { sort: { date: -1 } });
    },
    children: [
      {
        find(action) {
          return Items.find({ _id: action.itemId });
        }
      }
    ]
  }));

  Meteor.publishComposite('actionStockOut', () => ({
    find() {
      return Action.find({ type: 'Stock out' }, { sort: { date: -1 } });
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
