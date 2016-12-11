
var fs = require('fs');
var httpServ = require('https');
var WebSocketServer   = require('ws').Server;

var port = 7946;

var ssl_key = "openkey.pem";
var ssl_cert = "opencert.pem";

var processRequest = function( req, res ) {

    res.writeHead(200);
    res.end("All glory to WebSockets!\n");
};

var server = httpServ.createServer(

    {
        key: fs.readFileSync( ssl_key ),
        cert: fs.readFileSync( ssl_cert )
    }
    ,
    function(request, response) {

        response.writeHead(200);
    } 

).listen( port );

var wss = new WebSocketServer( { server: server } );

var devsea = require("./devsea");

devsea(wss);