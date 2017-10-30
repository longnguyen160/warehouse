import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Warehouses = new Mongo.Collection('warehouses');
const Schema = {};

Schema.Warehouses = new SimpleSchema({
  name: String,
  officeId: String,
  address: String
});

Warehouses.attachSchema(Schema.Warehouses);

export default Warehouses;
