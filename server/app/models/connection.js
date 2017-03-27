var elasticsearch = require('elasticsearch');
var elasticDeleteQuery  = require('elastic-deletebyquery');

var client = new elasticsearch.Client({  
  hosts: [
    'http://localhost:9200/',
    'http://localhost:9200/'
  ]
});

elasticDeleteQuery(client);

module.exports = client;  