import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.publish('userData', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Meteor.users.find(this.userId);
  });
}
