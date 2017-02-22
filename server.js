"use strict";

var express = require('express');
var app = express();
var path = require('path');
var Twitter = require("node-twitter-api");
var read = require('node-read');
var extractor = require('unfluff');
var _ = require('underscore');
var async = require('async');
var bodyParser = require('body-parser');

var twitter = new Twitter({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callback: process.env.CALLBACK
});

var _requestSecret;

var morgan = require('morgan');
app.use(morgan('tiny'));
app.use(bodyParser());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static_workspace', express.static(path.join(__dirname + '/static_workspace')));
app.use('/static_workspace/dist', express.static(path.join(__dirname + '/dist')));

app.get('/.well-known/acme-challenge/:acmeToken', function(req, res, next) {
  var acmeToken = req.params.acmeToken;
  var acmeKey;

  if (process.env.ACME_KEY && process.env.ACME_TOKEN) {
    if (acmeToken === process.env.ACME_TOKEN) {
      acmeKey = process.env.ACME_KEY;
    }
  }

  for (var key in process.env) {
    if (key.startsWith('ACME_TOKEN_')) {
      var num = key.split('ACME_TOKEN_')[1];
      if (acmeToken === process.env['ACME_TOKEN_' + num]) {
        acmeKey = process.env['ACME_KEY_' + num];
      }
    }
  }

  if (acmeKey) res.send(acmeKey);
  else res.status(404).send();
});

app.get("/request-token", function(req, res) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
});

app.get("/access-token", function(req, res) {
    var requestToken = req.query.oauth_token,
        verifier = req.query.oauth_verifier;

    twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
        if (err) {
            res.status(500).send(err);
        } else {
            twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                if (err){
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    var data = {
                        user: user,
                        access_token: accessToken,
                        access_secret: accessSecret
                    }
                    res.send(data);
                }
            });
        }
            
    });
});

app.get("/tweets", function(req, res){
    var accessToken = req.query.access_token,
        accessSecret = req.query.access_secret;

    twitter.getTimeline('home', {count: 100}, accessToken, accessSecret, (error, data) => {
        if(error){
            res.status(400).send(error);
        } else {
            res.send(data);
        }
    });
});

app.get("/readability", function(req, res){
    var url = req.query.url;

    read(url, function(err, article, meta) {
        var data = extractor(article.html);
        var response = "";
        if(article && article.title){
            response += "<h1>"+article.title+"</h1>";
        }
        if(data.image){
            response += "<img src='"+data.image+"'/>"
        }
        if(article && article.content){
            response += article.content;
        }
        
        res.send(response)
    });
});

app.post("/readabilitybulk", function(req, res){
    var urls = req.body;
    var requests = _.reduce(urls, (col, val, key)=>{
        col[key] = function(callback){
            read(val, function(err, article, meta) {
                return callback(null, article);
            });
        }
        return col;
    }, {});


    async.parallel(requests, (err, results) => {
        var data = JSON.stringify(_.reduce(results, (col, article, key)=>{
            var data = extractor(article.html);
            var response = "";
            if(article && article.title){
                response += "<h1>"+article.title+"</h1>";
            }
            if(data.image){
                response += "<img src='"+data.image+"'/>"
            }
            if(article && article.content){
                response += article.content;
            }
            col[key] = response;
            return col;
        }, {}));

        //console.log(Object.keys(data));
        res.send(data);
    })
    
    //     var data = extractor(article.html);
    //     var response = "";
    //     if(article && article.title){
    //         response += "<h1>"+article.title+"</h1>";
    //     }
    //     if(data.image){
    //         response += "<img src='"+data.image+"'/>"
    //     }
    //     if(article && article.content){
    //         response += article.content;
    //     }
        
    //     res.send(response)
    // });
});

app.get('*',function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'));
