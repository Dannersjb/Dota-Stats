var http = require("http");
var client = require('./connection.js');  

module.exports = {
     getAllPickData : function(callback) {
        client.search({
            index: 'pick',
            type: 'game',
            size: 200,
            body: {
                query: {
                    match_all: {}
                } 
            }
        }, function (error, response, status) {
            if (error) {
                console.log("Pick search error: " + error)
            } else {
                var picks = [];
                response.hits.hits.forEach(function(hit) {
                    picks.push(hit);
                })
                callback(picks)
            }
        });
    },
    getAllUserPickData : function(userName, callback) {
        client.search({
            index: 'pick',
            type: 'game',
            size: 200,
            body: {
                query: {
                    match: {
                        "author" : userName.toString()
                    }
                }
            }
        },function (error, response, status) {
            if (error) {
                console.log("Pick search error: " + error)
            } else {
                var picks = [];
                response.hits.hits.forEach(function(hit) {
                    picks.push(hit);
                })
                callback(picks)
            }
        });
    }
}
