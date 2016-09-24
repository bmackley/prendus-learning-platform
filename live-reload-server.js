const fs = require('fs');

const options = {
    key: fs.readFileSync(`${__dirname}/localhost.key`),
    cert: fs.readFileSync(`${__dirname}/localhost.cert`)
};

const server = require('http2').createServer(options, (request, response) => {
    io.emit('reload');
    response.end();
});
var io = require('socket.io')(server);
server.listen(32567);
