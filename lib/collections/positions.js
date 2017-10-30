import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Positions = new Mongo.Collection('positions');
const Schema = {};

Schema.Positions = new SimpleSchema({
  name: String,
  row: String,
  column: String,
  shelfId: String,
});

Positions.attachSchema(Schema.Positions);

export default Positions;
