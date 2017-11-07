import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Action = new Mongo.Collection('action');
const Schema = {};

Schema.Action = new SimpleSchema({
  date: Date,
  staffId: String,
  itemId: String,
  quantity: Number,
  details: [Object],
  'details.$.boxId': String,
  'details.$.boxName': String,
  'details.$.number': Number,
  type: String
});

Action.attachSchema(Schema.Action);


export default Action;
