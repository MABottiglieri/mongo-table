var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campainSchema = new Schema({
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

var campains = mongoose.model('campain', campainSchema);
module.exports = {campains};
