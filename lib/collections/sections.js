import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Sections = new Mongo.Collection('sections');
const Schema = {};

Schema.Sections = new SimpleSchema({
  name: String,
  warehouseId: String,
});

Sections.attachSchema(Schema.Sections);

export default Sections;