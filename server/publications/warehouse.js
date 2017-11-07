import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Warehouses} from '/lib/collections';

export default function () {
  Meteor.publish('getWarehouseList', function() {
    return Warehouses.find({});
  });
}
