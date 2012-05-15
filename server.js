//Written by Ben Hackett with help from: http://www.theroamingcoder.com/node/111
//and: http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/comment-page-2/#comments


// ## Express
var express = require('express')
var app     = express.createServer();
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

fs.readFile('record3.flac', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }

  var post_domain = 'www.google.com';
  var post_port = 80;
  var post_path = '/speech-api/v1/recognize?xjerr=1&client=chromium&lang=en-US';
  var post_options = {
    host: post_domain,
    port: post_port,
    path: post_path,
    method: 'POST',
    headers: {
      'Content-Type': 'audio/x-flac; rate=16000',
      'Content-Length': data.length
    }
  };

  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var responseObj = JSON.parse(chunk); 
      console.log(responseObj.hypotheses[0].utterance);
    });
  });

  // write parameters to post body
  post_req.write(data);
  post_req.end();
});

// # Start server
app.listen(3000);
var appPort = app.address().port + ''; // stringify that int!