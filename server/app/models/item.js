var http = require("http");


var client = require('./connection.js');  

module.exports = {
     getAllItemData : function(callback) {
        client.search({
            index: 'item',
            type: 'game',
            size: 243,
            body: {
                sort: [
                    { "id" : { order : "asc" } }
                ],
                query: {
                    match_all: {}
                }
            }
        }, function (error, response, status) {
            if (error) {
                console.log("item search error: " + error)
            } else {
                var matches = [];
                response.hits.hits.forEach(function(hit) {
                    matches.push(hit);
                })
                callback(matches)
            }
        });
    },
    getItemByIdData : function(itemId, callback) {
        client.search({
            index: 'item',
            type: 'game',
            size: 1,
            body: {
                sort: [
                    { "id" : { order : "asc" } }
                ],
                query: {
                    match: {
                        "id" : parseInt(itemId)
                    }
                }
            }
        }, function (error, response, status) {
            if (error) {
                console.log("item search error: " + error)
            } else {
                var matches = [];
                response.hits.hits.forEach(function(hit) {
                    matches.push(hit);
                })
                callback(matches)
            }
        });
    }
}

