var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  legacy : Boolean,
  url : String,
  bonus : Number,
  multiplier : Number,
  status : String,
  shortener : String,
  alts : Array,
  expiryDate : Date,
  random : Array,
  shortUrl : String,
  campaign : String,
  createdAt : Date,
  updatedAt : Date,
  daysLeft : Number,
  lastSuspended : Date,
  lastCancelled : Date,
  forbidden : Array,
  lastLoadedAt : Date
});

var urls = mongoose.model('url', urlSchema); //Test diventa la Collection "tests" in MongoDB
module.exports = {urls};
