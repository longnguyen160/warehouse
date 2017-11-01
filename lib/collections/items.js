import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');
const Schema = {};

Schema.Items = new SimpleSchema({
  warehouseId: String,
  sectionId: String,
  blockId: String,
  shelfId: String,
  boxId: [String],  
  seriesId: String,
  ISBN: String,
  quantity: Number,
  size: String,
  edition: String,
  price: Number,
  code: String,
  name: String
});

Items.attachSchema(Schema.Items);


export default Items;
