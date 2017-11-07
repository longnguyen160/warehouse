import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Report = new Mongo.Collection('report');
const Schema = {};

Schema.Report = new SimpleSchema({
  
});

Report.attachSchema(Schema.Report);


export default Report;
