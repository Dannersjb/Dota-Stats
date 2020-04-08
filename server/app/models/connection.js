var elasticsearch = require('elasticsearch');
var elasticDeleteQuery  = require('elastic-deletebyquery');

var client = new elasticsearch.Client({  
  hosts: [
    'http://192.168.0.10:9200/',
    'http://192.168.0.10:9200/'
  ]
});

elasticDeleteQuery(client);

module.exports = client;  