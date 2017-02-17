var key = "?key=BC047CF7E5D0CF76E35D7F63E6E07392";
//var steamId = "76561197998443920";
var profileLink = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
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
    }
}
