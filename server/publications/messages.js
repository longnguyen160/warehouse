import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '../../lib/collections';

export default function () {
  Meteor.publish('getMessages', function(chatId) {
    check(chatId, String);
    return Messages.find({ chatId });
  });
}
