var http = require("http");

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var matchId = "2938613600";
var matchLink = "http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=";

//var mongodb = require("mongodb"); 
//var MongoClient = mongodb.MongoClient;
//var mongoUrl = 'mongodb://localhost:27017/dota';

var client = require('./connection.js');  

module.exports = {
    getMatchById : function(matchId, callback)  {
        client.search({
            index: 'match',
            type: 'game',
            body: {
                query: {
                    match: { "match_id" : parseInt(matchId) }
                },
            }
        }, function (error, response, status) {
            if (error) {
                console.log("match search error: " + error)
            } else {
                callback(response.hits.hits);
            }
        });
    }, 
    getAllMatchData : function(callback) {
        client.search({
            index: 'match',
            type: 'game',
            body: {
                query: {
                    match_all: {}
                }
            }
        }, function (error, response, status) {
            if (error) {
                console.log("match search error: " + error)
            } else {
                var matches = [];
                response.hits.hits.forEach(function(hit) {
                    matches.push(hit);
                })
                callback(matches)
            }
        });
    },
    getMatchByGamemode : function(gameMode, callback) {
        client.search({
            index: 'match',
            type: 'game',
            body: {
                query: {
                    constant_score: {
                        filter: {
                            term: {
                                "game_mode": parseInt(gameMode)
                            }
                        }
                    }
                },
            }
        }, function (error, response, status) {
            if (error) {
                console.log("match search error: " + error)
            } else {
                callback(response.hits.hits);
            }
        });
    },
    getMatchByLobbyType : function(lobbyType, callback) {
        client.search({
            index: 'match',
            type: 'game',
            body: {
                query: {
                    constant_score: {
                        filter: {
                            term: {
                                "lobby_type": parseInt(lobbyType)
                            }
                        }
                    }
                },
            }
        }, function (error, response, status) {
            if (error) {
                console.log("match search error: " + error)
            } else {
                callback(response.hits.hits);
            }
        });
    },
}

