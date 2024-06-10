const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the yip_box.html file from the /templates directory
app.get('/yip_box', (req, res) => {
    res.sendFile(path.join(__dirname, '../../templates/yip_box.html'));
});

// Serve static files from the /static directory
app.use('/static', express.static(path.join(__dirname, '../')));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (data) => {
        console.log(`Received message: ${data.message}`);
        io.emit('chat message', data); // Emit the message to all clients
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

