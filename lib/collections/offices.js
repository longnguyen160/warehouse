import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Offices = new Mongo.Collection('offices');
const Schema = {};

Schema.Offices = new SimpleSchema({
  name: String,
  address: String,
});

Offices.attachSchema(Schema.Offices);

export default Offices;
