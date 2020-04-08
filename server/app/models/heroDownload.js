"use strict"
var http = require("http");

var client = require('./connection.js');  

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
var heroesUrl = "http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=BC047CF7E5D0CF76E35D7F63E6E07392";

var self = module.exports = {
    downloadHeroData: function () {

        http.get(heroesUrl, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () { 
                var heroData = JSON.parse(body);
                console.log("dota link worked!");
                var heroArray = heroData['result']['heroes'];
                var newHeroData = changeData(heroArray);
                console.log(newHeroData);
                 for (var i = 0; i < newHeroData.length; i++) {
                    updateDb(newHeroData[i]);
                    console.log(newHeroData[i])
                 }
            });
        }).on('error', function (e) {
            console.log("dota link did not work : ", e);
        });
    }
}

var changeData = function(heroData) {
        for (var i = 0; i < heroData.length; i++) {
            heroData[i]['name'] = heroData[i]['name'].substring(14);
            heroData[i]['name'] = heroData[i]['name'].replace(/_/g, ' ');
        };
        return heroData;
}


var updateDb = function(heroData) {
    var url = "localhost:9200/hero/external?pretty";

    client.index({  
        index: 'hero',
        type: 'game',
        id : heroData['id'].toString(),
        body: heroData
    },function(err,resp,status) {
        console.log(err, resp);
    });
}