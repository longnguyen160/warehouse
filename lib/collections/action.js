import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Action = new Mongo.Collection('action');
const Schema = {};

Schema.Action = new SimpleSchema({
  name: String,
  date: Date,
  staffId: String,
  itemId: String,
  quantity: Number,
  // status: String,
  type: String
});

Action.attachSchema(Schema.Action);


export default Action;
