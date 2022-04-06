const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'borongboil';

const dbBorongBoil = mongoose.createConnection(connectionUrl + '/' + dbName, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

module.exports = {
  dbBorongBoil: dbBorongBoil
}