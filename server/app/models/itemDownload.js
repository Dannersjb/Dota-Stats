"use strict"
var http = require("http");

var client = require('./connection.js');  

var key = "&key=BC047CF7E5D0CF76E35D7F63E6E07392";
var itemsUrl = "http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v0001/?key=BC047CF7E5D0CF76E35D7F63E6E07392";

var self = module.exports = {
    downloadItemData: function () {

        http.get(itemsUrl, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () { 
                var itemData = JSON.parse(body);
                console.log("dota link worked!");
                var itemArray = itemData['result']['items'];
                var newitemData = changeData(itemArray);
                bulkIndex('item', 'game', newitemData);   
            });
        }).on('error', function (e) {
            console.log("dota link did not work : ", e);
        });
    }
}

var changeData = function(itemData) {
        for (var i = 0; i < itemData.length; i++) {
            itemData[i]['name'] = itemData[i]['name'].substring(5);
            itemData[i]['name'] = itemData[i]['name'].replace(/_/g, ' ');
        };
        return itemData;
}

var bulkIndex = function(index, type, data) {
  let bulkBody = [];
  data.forEach(item => {     
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id : item['id'].toString()
      },
    });

    bulkBody.push(item);
  })

  client.bulk({body: bulkBody});
}