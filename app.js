const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var Twitter = require('twitter');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
  });
});

//auth twitter
var client = new Twitter({
    consumer_key: 'IlZvZj5ZSRt5jq5cGrqMGDu3j',
    consumer_secret: '2Svdv4O4slFmCNwP54IFUiTNUepGg9DU5SrMSMF84GZqCI3kya',
    access_token_key: '3381908891-G0wiIJaaHYDoSYOwSsZChw9t7itxIuBrCprUv2F',
    access_token_secret: 'jZoJBszcd7JkJ88cXa80HC2BLkPNUfzkaKnIjPvL0T5md'
  });

client.get('search/tweets', {q: 'fighterz'}, function(error, tweets, response) {
    console.log(tweets);
 });


 /////////TESTS MONGODB/////////

//tests d'insertion et de récupération de documents 
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

const findDocuments = function(db, callback) {
// Get the documents collection
const collection = db.collection('documents');
// Find some documents
collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
});
}