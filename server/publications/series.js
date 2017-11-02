import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Series } from '../../lib/collections';

export default function () {
  Meteor.publish('getSeries', function() {
    return Series.find({});
  });
}
