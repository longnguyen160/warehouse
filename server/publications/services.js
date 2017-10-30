import { Meteor } from 'meteor/meteor';
import { Services } from '../../lib/collections';

export default function () {
  Meteor.publish('getServiceData', function() {
    return Services.find({ userId: Meteor.userId() });
  });
}
