import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Shelves = new Mongo.Collection('shelves');
const Schema = {};

Schema.Shelves = new SimpleSchema({
  name: String,
  blockId: String,
});

Shelves.attachSchema(Schema.Shelves);


export default Shelves;
