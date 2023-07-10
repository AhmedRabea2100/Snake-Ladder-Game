const express = require("express");
<<<<<<< Updated upstream
const cors = require("cors");
const router = require('./routes/join_room')
=======
//const cors = require("cors");
const router=require('./routes/router')
const startgame = require('./controllers/startgame,js');
const move=require('./controllers/move.js');

>>>>>>> Stashed changes
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use( router);
app.get('/startgame/:gameId', startgame);
app.get('/move/:gameId/:playerId', move);

app.use('/api/', router)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});