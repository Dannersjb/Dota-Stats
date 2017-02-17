"use strict"
var http = require("http");
//var mongodb = require("mongodb");
var client = require('./connection.js');  
var assert = require('assert');

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var matchId = "2938613600";
var matchLink = "http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=";
var Matchurl = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=BC047CF7E5D0CF76E35D7F63E6E07392";

var self = module.exports = {
    downloadMatchData: function (matchId) {
        var url = matchLink + matchId + key;
        //var url = url;

        http.get(url, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {        
                var matchData = JSON.parse(body);
                console.log("dota link worked!");
                var matchArray = matchData['result'];
                var newMatchData = changeData(matchArray);
                console.log(newMatchData);
                updateDb(newMatchData);
            });
        }).on('error', function (e) {
            console.log("dota link did not work : ", e);
        });
    }
}

var changeData = function(matchData) {
        matchData['duration'] = formatDuration(matchData['duration']);
        matchData['game_mode'] = setGameModeNames(matchData['game_mode'])
        matchData['lobby_type'] = setLobbyNames(matchData['lobby_type'])
        return matchData;
}

var formatDuration = function(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = duration - minutes * 60;
    var hours = Math.floor(duration / 3600);
    var matchDuration = hours > 0 ? "" + hours + ":" + minutes + ":" + seconds : "" + minutes + ":" + seconds; 
    return matchDuration;
}

var setLobbyNames = function(lobby) {
    var lobbyName;
    switch(lobby) {
        case 0: {
            lobbyName = "Public Matchmaking";
            break;
        }
        case 1: {
            lobbyName = "Practice";
            break;
        }
        case 2: {
            lobbyName = "Tournament";
            break;
        }
        case 3: {
            lobbyName = "Tutorial";
            break;
        }
        case 4: {
            lobbyName = "Co-op with bots";
            break;
        }
        case 5: {
            lobbyName = "Team match";
            break;
        }
        case 6: {
            lobbyName = "Solo Queue";
            break;
        }
        case 7: {
            lobbyName = "Ranked Matchmaking";
            break;
        }
        case 8: {
            lobbyName = "Solo Mid 1v1";
            break;
        }
        default: {
            lobbyName = "Unknown";
            break;
        }
    }
    return lobbyName;
}

var setGameModeNames = function(gameModeId) {
    var gameMode;
    switch(gameModeId) {
        case 1:
        case 22: {
            gameMode = "All Pick";
            break;
        }
        case 2: {
            gameMode = "Captains Mode";
            break;
        }
        case 3: {
            gameMode = "Random Draft";
            break;
        }
        default : {
            gameMode = "Unknown";
            break;
        }
    }
    return gameMode;
} 

var updateDb = function(matchData) {
    var url = "localhost:9200/match/external?pretty";

    client.index({  
        index: 'match',
        type: 'game',
        body: matchData
    },function(err,resp,status) {
        console.log(resp);
    });


    //var MongoClient = mongodb.MongoClient;
    //var url = 'mongodb://localhost:27017/dota';

    // MongoClient.connect(url, function(err, db) {
    //     if (err) {
    //         console.log('Unable to connect to the Server', err);
    //     } else {
    //         console.log('Connection established to', url);

    //         var collection = db.collection('match');

    //         db.collection('match').insertOne(body, function(err, result) {
    //             //assert.equal(err, null);
    //             console.log("Inserted Match into db");
    //             //callback();
    //         });
    //     }
    // });
}