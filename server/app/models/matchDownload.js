"use strict"
var http = require("http");
var client = require('./connection.js');  
var assert = require('assert');
var steamUsers = require('./steamProfile');

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var matchId = "2938613600";
var MatchDetailurl = "http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=";
var MatchHistoryurl = "http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id="
var inDb;

var self = module.exports = {
    downloadMatchData: function (matchId) {
        var url = MatchDetailurl + matchId + key;

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
                downloadUsers(newMatchData['players']);
                updateDb(newMatchData);
            });
        }).on('error', function (e) {
            console.log("dota link did not work : ", e);
        });
    },
    downloadLatestMatches: function(userId) {
        var url = MatchHistoryurl + userId + key + '&matches_requested=20';

        http.get(url, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {        
                var matchHistory = JSON.parse(body);
                console.log("dota link worked!");
                console.log("status : " + matchHistory['result']['status']);
                if (matchHistory['result']['status'] == 1) {
                    var matchArray = matchHistory['result']['matches'];
                    for(var match of matchArray) {
                        self.downloadMatchData(match['match_id'])
                    }
                } 
            });
        }).on('error', function (e) {
            console.log("dota link did not work : ", e);
        });
    }
}

var changeData = function(matchData) {
        matchData['duration'] = formatDuration(matchData['duration']);
        matchData['game_mode'] = setGameModeNames(matchData['game_mode'])
        // lobby type has been set as a number for some reason
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

var checkDb = function(matchId) {
    client.search({
        index: 'match',
        type: 'game',
        body: {
            query: {
                match: {
                    "match_id" : parseInt(matchId)
                }
            }
        }
    },function(error, response, status) {
        if (response.hits.total == 0) {
            inDb = false
        } else {
            inDb = true
        } 
    })
    return inDb;
}

var updateDb = function(matchData) {
    var url = "localhost:9200/match/external?pretty";

    client.index({  
        index: 'match',
        type: 'game',
        id : matchData['match_id'].toString(),
        body: matchData
    },function(err,resp,status) {
        console.log(resp, err);
    });
}

var downloadUsers = function(users) {
    for (let user of users) {
        steamUsers.downloadSteamProfileData('765' + (user['account_id'] + 61197960265728));
    }
}