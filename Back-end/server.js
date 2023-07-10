const express = require("express");
const cors = require("cors");
const join_room_router = require('./routes/join_room')
const startgame = require('./controllers/startgame.js');
const move=require('./controllers/move.js');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db= require('./models')
const playerRoutes = require ('./routes/playerRoutes')
const rooms_route = require('./routes/rooms_route');
const create_route = require('./routes/create_route');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.get('/startgame/:gameId', startgame);
app.get('/move/:gameId/:playerId', move);

app.use('/api/', join_room_router)
app.use(cookieParser())

//testing login and Registeration routes
app.use('/players',playerRoutes)

app.use(rooms_route);
app.use(create_route);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

