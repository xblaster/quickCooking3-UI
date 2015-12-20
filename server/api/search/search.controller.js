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



    //res.json([]);
    //return client.search
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
}

exports.getImage = function(req, res) {
    console.log(req.query);

    var imageFile;

    if (!req.query.quality) {
        imageFile = imageVolume + "/" + req.params.name + ".jpg";
    } else {
        imageFile = imageVolume + "/" + req.query.quality + "/" + req.params.name + ".jpg";
    }

    if (fs.existsSync(imageFile)) { return res.sendFile(imageFile); }

    //create dir if not exist
    if (!fs.existsSync(imageVolume + "/" + req.query.quality)){
           fs.mkdirSync(imageVolume + "/" + req.query.quality);
    }

    try {

    im.resize({
        srcPath: imageVolume + "/" + req.params.name + ".jpg",
        dstPath: imageFile,
        width: quality[req.query.quality].width
    }, function(err, stdout, stderr) {
        if (err) throw err;
        return res.sendFile(imageFile);0
    });
    }

    catch (e) {
      console.log("error !");
      console.log(e);
      return res.json("error !")
    }







    
    //return res.json(req.params.name);

};
