const fs = require('fs');

//https key and certificate, necessary for HTTP2
const options = {
    key: fs.readFileSync(`${__dirname}/localhost.key`),
    cert: fs.readFileSync(`${__dirname}/localhost.cert`)
};

//make an HTTP2 server that runs locally
const server = require('http2').createServer(options, (request, response) => {
    //when any kind of request comes in, tell any connected clients to reload
    io.emit('reload');
    response.end();
});
var io = require('socket.io')(server);
server.listen(32567); //I'm hoping this port will more or less always be open
