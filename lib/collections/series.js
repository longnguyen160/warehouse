import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Series = new Mongo.Collection('series');
const Schema = {};

Schema.Series = new SimpleSchema({
  name: String,
  author: String,
  shelfIds: [Object],
  'shelfIds.$.warehouseId': String,
  'shelfIds.$.ids': [String],
  publishYear: String,
  publisher: String,
  categoryId: [String]
});

Series.attachSchema(Schema.Series);

export default Series;
