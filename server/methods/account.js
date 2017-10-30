import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';

export default function () {
  Meteor.methods({
    'account.createUser'(data) {
      check(data, Object);

      if (!data.email) throw new Meteor.Error(403, 'Email is required.');
      const existedEmail = Meteor.users.findOne({ 'emails.$.address': data.email });
      const existedUsername = Meteor.users.findOne({ 'username': data.name });

      if (existedEmail) throw new Meteor.Error(403, 'Email already existed.');
      if (existedUsername) throw new Meteor.Error(403, 'Username already existed.');
      const userId = Accounts.createUser({ email: data.email, password: data.password });
      const user = Meteor.users.findOne(userId);
      const userData = {
        imageSrc: '/images/default_avatar.jpg'
      }

      if (user) {
        Meteor.users.update(
          { _id: userId },
          {
            $set: {
              username: data.name,
              role: data.accountType,
              data: userData
            }
          }
        );
        return user;
      }

      throw new Meteor.Error(403, 'Can not create user.');
    }
  });
}
