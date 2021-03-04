const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    process.env.MONGO_LINK.replace('<password>', process.env.MONGO_PASSWORD)
      .replace('<username>', process.env.MONGO_USER)
      .replace('<database>', process.env.MONGO_DB)
  )
    .then((client) => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch((err) => console.error(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
