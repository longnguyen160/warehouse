import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Blocks = new Mongo.Collection('blocks');
const Schema = {};

Schema.Blocks = new SimpleSchema({
  name: String,
  sectionId: String,
});

Blocks.attachSchema(Schema.Blocks);


export default Blocks;
