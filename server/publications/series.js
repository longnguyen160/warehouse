import { Meteor } from 'meteor/meteor';
import { Series } from '../../lib/collections';

export default function () {
  Meteor.publish('getSeries', function() {
    return Series.find({});
  });
}
