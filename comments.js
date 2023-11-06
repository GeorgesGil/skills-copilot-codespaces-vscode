// Create a web server
// Run using: node comments.js
// Then, open in browser: http://localhost:3000/
// To stop server: Ctrl + C

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    console.log("path: " + path);
    if (path == '/comments.json') {
        if (request.method == "POST") {
            console.log("POST request");
            var body = '';
            request.on('data', function (data) {
                body += data;
                console.log("Partial body: " + body);
            });
            request.on('end', function () {
                var post = qs.parse(body);
                console.log("post: " + post);
                comments.push(post.comment);
                var json = JSON.stringify(comments);
                fs.writeFile('comments.json', json, 'utf8', function (err) {
                    if (err) throw err;
                    console.log('File saved!');
                });
            });
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(comments));
        response.end();
    } else {
        fs.readFile('index.html', 'utf8', function (err, data) {
            if (err) throw err;
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
});

// Listen on port 3000, IP defaults to
