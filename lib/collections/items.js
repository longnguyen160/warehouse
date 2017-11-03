import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');
const Schema = {};

Schema.Items = new SimpleSchema({
  details: [Object],
  'details.warehouseId': String,
  'details.sectionId': String,
  'details.blockId': String,
  'details.shelfId': String,
  'details.boxId': [String],
  'details.quantity': Number,
  'details.code': String,
  seriesId: String,
  ISBN: String,
  size: String,
  edition: String,
  price: Number,
  name: String
});

Items.attachSchema(Schema.Items);


export default Items;
