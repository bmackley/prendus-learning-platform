const server = require('http').createServer((request, response) => {
    io.emit('reload');
    response.end();
});
var io = require('socket.io')(server);
server.listen(32567);
