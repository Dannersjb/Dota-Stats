var key = "?key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var steamId = "76561197998443920";
var profileLink = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
var client = require('./connection.js');  

var http = require("http");

module.exports = {
    getSteamProfileData : function(steamId, callback)  {
            var url = profileLink + key + '&steamids=' + steamId;

            http.get(url, function(res) {
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });

                res.on('end', function() {
                    var profileData = JSON.parse(body);
                    console.log("steam profile link worked!");
                    var profileArray = profileData['response']['players'];
                    callback(profileArray);
                });
            }).on('error', function(e){
                console.log("steam profile link did not work : ", e);
            }); 
    },
    downloadSteamProfileData : function(steamId) {
            var url = profileLink + key + '&steamids=' + steamId;

            http.get(url, function(res) {
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });

                res.on('end', function() {
                    var profileData = JSON.parse(body);
                    console.log("steam profile link worked!");
                    var profileArray = profileData['response']['players'];    
                    if (profileArray.hasOwnProperty(0)) {
                        profileArray[0]['steamid32'] = profileArray[0]['steamid'].substr(3) - 61197960265728;
                        updateDb(profileArray[0]);    
                    }
                });
            }).on('error', function(e){
                console.log("steam profile link did not work : ", e);
            }); 
    },
    getUserInfo : function(steamId, callback) {
        client.search({
            index: 'user',
            type: 'game',
            size : 1,
            body: {
                query: {
                   match: {
                        "steamid32": parseInt(steamId)
                    }
                }
            }
        }, function (error, response, status) {
            if (error) {
                console.log("error getting user: " + error)
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

var updateDb = function(userData) {
    var url = "localhost:9200/user/external?pretty";
    client.index({  
        index: 'user',
        type: 'game',
        id : userData['steamid32'].toString(),
        body: userData
    },function(err,resp,status) {
        console.log(resp, err);
    });
}
