import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Categories = new Mongo.Collection('categories');
const Schema = {};

Schema.Categories = new SimpleSchema({
  name: String,
});

Categories.attachSchema(Schema.Categories);

export default Categories;
