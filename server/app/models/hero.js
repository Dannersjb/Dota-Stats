var http = require("http");

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var matchId = "2938613600";
var matchLink = "http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=";

var client = require('./connection.js');  

module.exports = {
     getAllHeroData : function(callback) {
        client.search({
            index: 'hero',
            type: 'game',
            size: 200,
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
                console.log("hero search error: " + error)
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

