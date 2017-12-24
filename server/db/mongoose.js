var mongoose = require('mongoose');

var dbPort = 27017;
var dbPath = `localhost:${dbPort}`;
var dbName = 'sails';

var MongoLocalPath = process.env.MONGODB_URI || `mongodb://${dbPath}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(MongoLocalPath);

module.exports = {mongoose};
