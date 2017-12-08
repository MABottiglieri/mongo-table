var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  vendorAccounts: Array,
  qualifiers: Array,
  createdAt: Date,
  updatedAt: Date,
  notes: String,
  name: String
});

var clients = mongoose.model('client', clientSchema); //Test diventa la Collection "tests" in MongoDB
module.exports = {clients};
