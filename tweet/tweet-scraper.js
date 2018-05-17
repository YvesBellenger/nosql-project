// ---- Module Imports ----

var http  = require('https');
var fs    = require('fs');
var oAuth = require('oauth').OAuth;
var mongo = require('mongodb');  

// ---- Connection to MongoDB Server and Database ----

var mdbServer = mongo.Server('localhost', 27017, {'auto_reconnect' : true});
var mdb = mongo.Db('nosql-twetter', mdbServer);

mdb.open(function (err, db) {
    if (!err) { console.log('Connected to nosql-twetter@localhost:27017'); }

    db.createCollection('tweets', function (err, collection) {

        // ---- Processing Functions ----

        var firstTweet = true;

        function processResponseData(data) {
            var tweet = data.toString();
            var parsedTweet = JSON.parse(tweet);

            if (firstTweet) {
                console.log(tweet);
                firstTweet = false;
            } else {
                console.log(",\n");
                console.log(tweet);
            }
        }

        // ---- Connecting to Twitter ----

        var oa = new oAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            "IlZvZj5ZSRt5jq5cGrqMGDu3j",
            "2Svdv4O4slFmCNwP54IFUiTNUepGg9DU5SrMSMF84GZqCI3kya",
            "1.0A",
            "http://demos.ryanmullins.org/streamToMongoDB",
            "HMAC-SHA1"
        );

        var request = oa.get(
            "https://stream.twitter.com/1.1/statuses/filter.json?locations=-77.9,40.7,-77.8,40.8",
            "3381908891-G0wiIJaaHYDoSYOwSsZChw9t7itxIuBrCprUv2F",
            "jZoJBszcd7JkJ88cXa80HC2BLkPNUfzkaKnIjPvL0T5md"
        );

        request
            .addListener('response', function (response) {
                response.on('data', processResponseData);
            })
            .end();
    });
});