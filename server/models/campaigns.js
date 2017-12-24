var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
  legacy: Boolean,
  client: String ,
  order: String,
  createdBy: Date,
  startDate: Date,
  createdAt: Date,
  updatedAt: Date,
  notes: String,
  package: Object
});

var campaigns = mongoose.model('campaign', campaignSchema);
module.exports = {campaigns};
