import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Services } from '../../lib/collections';

export default function () {
  Meteor.methods({
    'profile.updateUser'(data, email) {
      check(data, Object);
      check(email, String);
      const existedEmail = Meteor.users.findOne({ 'emails.address': email });

      if (existedEmail._id !== Meteor.userId()) throw new Meteor.Error(403, 'Email already existed.');
      if (email.trim().length > 0) {
        Meteor.users.update(
          {_id: Meteor.userId()},
          {
            $set: {
              data,
              'emails.0.address': email
            }
          },
          (callback) => callback
        );
      } else {
        Meteor.users.update(
          {_id: Meteor.userId()},
          {
            $set: {
              data
            }
          },
          (callback) => callback
        );

      }
    },

    'profile.handleService'(data) {
      check(data, Object);
      const existedService = Services.findOne({ userId: Meteor.userId(), name: data.name });

      if (data.type === 'Add') {
        if (existedService) throw new Meteor.Error(403, 'Service already existed!');
        Services.insert(data);
      } else {
        Services.update({ _id: data.serviceId }, { $set: data });
      }
    },

    'profile.removeService'(serviceId) {
      check(serviceId, String);
      Services.remove({ _id: serviceId });
    }
  });
}
