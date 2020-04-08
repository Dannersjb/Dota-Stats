var elasticsearch = require('elasticsearch');
var elasticDeleteQuery  = require('elastic-deletebyquery');

var client = new elasticsearch.Client({  
  hosts: [
    'http://elasticsearch:9200/'
  ]
});

elasticDeleteQuery(client);

module.exports = client;  