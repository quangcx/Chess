const express  = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('move', function(move) {
        socket.broadcast.emit('move', move);
    });

    socket.on('disconnect', () => {
        console.log('disconnected!');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('App is running at port 3000');
});