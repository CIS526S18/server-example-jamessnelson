"use strict";

//Import HTTP lib
const http = require('http');
//fs lib
const fs = requre('fs');
//Define port
const PORT = 3000;

//The cache
const cache = {};
cache['openhouse.html'] = fs.readFileSync('public/openhouse.html');
cache['openhouse.css'] = fs.readFileSync('public/openhouse.css');
cache['openhouse.js'] = fs.readFileSync('public/openhouse.js');

/** @function serveFile
  * Serves the specified file with the provided response object
  * @param {string} path - specifies the filepath to read
  * @param {http.serverResponse} res - the http response object
  */
function serveFile(path, res){
  fs.readFile(path, function(err, data){
      if(err){
         console.error(err);
         res.statusCode = 500;
         res.end("Server Error: Could not read file");
         return;
       }
      res.end(data);
  });
}

function serveIndex(res){
  fs.readdir(path, function(err, files){
    if(err){
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
    }
    var html = "<p>Index of " + path + " </p>";
    html += "<ul>";
    html += files.map(function(item){
      return "<a href='" + item + "'>" + item + "</a>";
    }).join("");
    html += "</ul>"
  })
}

/** @function handleRequest
  * Request handler for the http server
  * @param {http.clientRequest} req - the http request object
  * @param {http.serverResponse} res - the http response object
  */
function handleRequest(req, res) {
//Map request urls to files
switch(req.url) {
    case '/':
      serveIndex(res);
      break;
    case '/openhouse.html':
      //res.end(cache['openhouse.html']) FOR REFERENCE
      serveFile('public/openhouse.html', res);
      break;
    case '/openhouse.css':
      serveFile('public/openhouse.css', res);
      break;
    case '/openhouse.js':
      serveFile('public/openhouse.js', res);
      break;
    default:
      res.statusCode = 404;
      res.end("File not found");
  }
}

//Create web server
var server = http.createServer(handleRequest);

//Start listening on port PORT
server.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
