const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const socketio = require('socket.io');
const http = require('http');
const users = require('./routes/users');
const stocks = require('./routes/stocks');

const app = express();

// DB
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to ' + config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('oh fuck, database error ' + err);
})


// Port number
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)
app.use('/stocks', stocks)


let server = http.createServer(app);
let io = socketio(server);
//module.exports = io;

io.on('connection', function (socket) {
    
    console.log("New client connected");
    socket.on('disconnect', () => {
        console.log('user has disconnected');
    });
    stocks.addClient(socket);
    stocks.notifyClients();

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('refresh', (message) => {
        console.log("Update Received: " + message);
        //stocks.notifyClients(socket);
        io.emit('Update', "yoyoyoyoyoyyo");    
    });
});

// Start server on port
server.listen(port, () => {
    console.log('Server startet on port: ' + port);
});
