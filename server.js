"use strict";

var express = require('express');
var app = express();
var path = require('path');
var Twitter = require("node-twitter-api");
var read = require('node-read');
var extractor = require('unfluff');

var twitter = new Twitter({
    consumerKey: 'CydX9EBF2uwLcxjFHA2BEQ0CD',
    consumerSecret: 'Z3NsDWLMkbnMHfEt85bkbthcUGyWG7dx9a3rQvFafsyKkip2Ev',
    callback: 'http://localhost:3000/'
});

var _requestSecret;

var morgan = require('morgan');
app.use(morgan('tiny'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.use('/static_workspace', express.static('static_workspace'));
app.use('/dist', express.static('dist'))

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

    twitter.getTimeline('home', {count: 50}, accessToken, accessSecret, (error, data) => {
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

app.get('*',function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);
