import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Chat, Messages } from '../../lib/collections';

export default function () {
  Meteor.methods({
    'chat.sendMessage'(message, userId) {
      check([message, userId], [String]);

      let chat = Chat.findOne({
        $or: [
          {
            fromUserId: Meteor.userId(),
            toUserId: userId
          },
          {
            fromUserId: userId,
            toUserId: Meteor.userId()
          }
        ]
      });

      if (!chat) {
        chat = {};
        chat._id = Chat.insert({
          fromUserId: Meteor.userId(),
          toUserId: userId
        });
      }
      Messages.insert({
        chatId: chat._id,
        fromUserId: Meteor.userId(),
        toUserId: userId,
        message: message
      })
    }
  });
}
