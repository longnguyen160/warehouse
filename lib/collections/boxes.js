import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Boxes = new Mongo.Collection('boxes');
const Schema = {};

Schema.Boxes = new SimpleSchema({
  shelveId: String,
  rowId: String,
  columnId: String,
  maxItem: Number,
  currentQuantity: Number,
  status: Boolean
});

Boxes.attachSchema(Schema.Boxes);


export default Boxes;
