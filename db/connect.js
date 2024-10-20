const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
    }
    const mongoUri = process.env.MONGO_URI;
    MongoClient.connect(mongoUri)
      .then((client) => {
        _db = client;  // Make sure to get the database instance
        callback(null, _db);
      })
      .catch((err) => {
        console.log(err)
        callback(err);
      });
  };

const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};