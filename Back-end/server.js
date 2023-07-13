const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./models')
const http = require('http');
const socketio = require('socket.io');

// routes
const join_room_router = require('./routes/join_room')
const move = require('./controllers/move.js');
const playerRoutes = require ('./routes/playerRoutes')
const rooms_route = require('./routes/rooms_route');
const create_route = require('./routes/create_route');

//const http = require("http").createServer();
const app = express();
const server = http.createServer(app); 
// const io = socketIO(server);



const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
global.io = io

/* var corsOptions = {
  origin: "http://localhost:8081"
};  */

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

//app.use(cors(corsOptions));
app.use((req, res, next) => {
  // Set headers to allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); 
// parse requests of content-type - application/json

app.use(express.json());
app.use(cookieParser())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routing
app.post('/move/', move);
app.use('/api/', join_room_router)
app.use('/players',playerRoutes)
app.use(rooms_route);
app.use(create_route);
// const controller = require('./controllers/create');
// app.post('/create', (req, res, io) => controller.createGame(req, res, io));
app.get('/', (req, res) =>{
  res.json("RECIEVED");
})

// // Socket
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });

// });

io.on('connection', (socket) => {
  console.log('New client connected');

  // Event handler for 'message' event
  // socket.on('message', (data) => {
  //   console.log('Message received:', data);
  //   // Broadcast the received message to all connected clients
  //   io.emit('message', data);
  // });

  // Event handler for socket disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// app.post('/create', (req, res, io) => controller.createGame(req, res, io));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// module.exports = { app, server, io };
// app.set('io', io);