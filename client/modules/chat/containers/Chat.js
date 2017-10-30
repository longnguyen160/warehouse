import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import Chat from '../components/Chat';

export const composer = ({ context, clearErrors, userId }, onData) => {
  const { LocalState, Collections } = context();
  let messages = [];
  let userTarget = null;
  let allUsers = [];
  let getUserId = null;

  if (Meteor.subscribe('getAllChat').ready()) {
    const allChat = Collections.Chat.find({}).fetch();
    const userIds = allChat.map(chat => {
      if (chat.fromUserId === Meteor.userId()) {
        return chat.toUserId;
      } else if (chat.toUserId === Meteor.userId()) {
        return chat.fromUserId;
      }
    });
    if (Meteor.subscribe('getAllUsers', userIds)) {
      const fields = {
        username: 1,
        data: 1
      };

      allUsers = Meteor.users.find({ _id: { $in: userIds } }, { fields }).fetch();
      getUserId = LocalState.get('USERID') ? LocalState.get('USERID') : (userId ? userId : (allUsers[0] ? allUsers[0]._id : null));
    }
  }

  if (getUserId && Meteor.subscribe('getChat', getUserId).ready() && Meteor.subscribe('getUserData', getUserId).ready()) {
    userTarget = Meteor.users.findOne({ _id: getUserId });
    const chat = Collections.Chat.findOne({
      $or: [
        {
          fromUserId: Meteor.userId(),
          toUserId: getUserId
        },
        {
          fromUserId: getUserId,
          toUserId: Meteor.userId()
        }
      ]
    });
    if (chat && Meteor.subscribe('getMessages', chat._id).ready()) {
      messages = Collections.Messages.find({ chatId: chat._id }).fetch();
      messages = messages.reduce((o, cur) => {
        let occurs = o.reduce((n, item, i, arr) => {
          return (arr[arr.length - 1][0].fromUserId === cur.fromUserId) ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs] = o[occurs].concat(cur);
        } else {
          let obj = [cur];
          o = o.concat([obj]);
        }
        return o;
      }, []);
    }
  }
  onData(null, { messages, userTarget, allUsers, getUserId });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  sendMessage: actions.chat.sendMessage,
  chatWithOther: actions.chat.chatWithOther,
  clearErrors: actions.chat.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Chat);
