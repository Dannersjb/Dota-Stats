"use strict"
var http = require("http");
//var mongodb = require("mongodb");
var client = require('./connection.js');  

var self = module.exports = {
    createNewPick: function (pickData) {
        updateDb(pickData);
    },
    deletePick: function (pickId) {
        deleteFromDb(pickId);
    }
}

var updateDb = function(pickData) {
    var url = "localhost:9200/pick/external?pretty";
    console.log(pickData);
    client.index({  
        index: 'pick',
        type: 'game',
        body: pickData
    },function(err,resp,status) {
        console.log(resp.created);
    });
}

var deleteFromDb = function(pickId) {
    var url = "localhost:9200/pick/_delete_by_query";
    client.deleteByQuery({
        index: 'pick',
        type: 'game',
        body : {
            query: {
                match : {
                     "_id" : pickId.toString()
                }
            }
        }  
    },
    function(err, response) {
        console.log(response, err);
    });
}
