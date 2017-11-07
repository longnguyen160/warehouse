import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';

export default function () {
  Meteor.methods({
    'account.addUser'(data) {
      check(data, Object);

      if (!data.email) throw new Meteor.Error(403, 'Email is required.');
      const existedEmail = Meteor.users.findOne({ 'emails.$.address': data.email });

      if (existedEmail) throw new Meteor.Error(403, 'Email already existed.');
      const userId = Accounts.createUser({ email: data.email, password: data.password });
      const user = Meteor.users.findOne(userId);
      const createdAt = new Date();

      if (user) {
        
        Meteor.users.update(
          { _id: userId },
          {
            $set: {
              firstName: data.firstName,
              lastName: data.lastName,
              company: 'Zigvy Coperation',
              role: 'staff',
              warehouseId: data.warehouseId,
              createdAt
            }
          }
        );
        return user;
      }

      throw new Meteor.Error(403, 'Can not create user.');
    },

    'account.removeUser'(userId) {
      check(userId, String);

      Meteor.users.remove({_id: userId});
    }
  });
}
