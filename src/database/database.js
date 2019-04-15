const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/bank', { useMongoClient: true });
//mongoose.createConnection('mongodb://localhost/bank', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;