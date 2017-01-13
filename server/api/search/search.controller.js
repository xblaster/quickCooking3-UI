/*eslint-env node */
'use strict';

var _ = require('lodash');
var host = process.env.ELASTIC || "localhost:9200";

var elasticsearch = require('elasticsearch');
var imageVolume = process.env.imageVolume || '/experimental/workdir';
var im = require('imagemagick');
var fs = require('fs');

// Get list of searchs
exports.index = function(req, res) {

    console.log("launching searches");

    var client = new elasticsearch.Client({
        host: host
    });

    client.search({
        index: 'recipes',
        type: 'recipe',
        body: {
            "from" : 0, "size" : 25,
            query: {
                
                 "fuzzy_like_this" : {
                    "fields" : ["content"],
                    "like_text" : req.query.text,
                }
                
                 // "match" : {
                 //    "content": {
                 //        "query" : req.query.text,
                 //    }
                 // }

            }
        }
    }).then(function(resp) {
        //console.log(resp);
        var hits = resp.hits.hits;
        res.json(hits);
    }, function(err) {
        console.trace(err.message);
        res.json(err.message);
    });
};

// Get list of searchs
exports.book = function(req, res) {

    console.log("launching searches");

    var client = new elasticsearch.Client({
        host: host
    });

    client.search({
        index: 'recipes',
        type: 'recipe',
        body: {
            "from" : 0, 
            query: {
                
                 "term" : {
                    "bookName": req.query.name
                }
                
                 // "match" : {
                 //    "content": {
                 //        "query" : req.query.text,
                 //    }
                 // }

            }
        }
    }).then(function(resp) {
        //console.log(resp);
        var hits = resp.hits.hits;
        res.json(hits);
    }, function(err) {
        console.trace(err.message);
        res.json(err.message);
    });
};


// return image
// 


var quality = {
    p: {
        width: 20
    },
    t: {
        width: 40
    },
    m: {
        width: 200
    },
    l: {
        width: 800
    }
};

exports.getImage = function(req, res) {
	//console.log(req.query)
    var imageFile;

    if (!req.query.quality) {
        imageFile = imageVolume + "/" + req.params.name + ".jpg";
    } else {
        imageFile = imageVolume + "/" + req.query.quality + "/" + req.params.name + ".jpg";
    }
    res.sendFile(imageFile);
};

exports.getImage2 = function(req, res) {
    console.log(req.query);

    var imageFile;

    if (!req.query.quality) {
        imageFile = imageVolume + "/" + req.params.name + ".jpg";
    } else {
        imageFile = imageVolume + "/" + req.query.quality + "/" + req.params.name + ".jpg";
    }

    if (fs.existsSync(imageFile)) { res.sendFile(imageFile); } 
};
