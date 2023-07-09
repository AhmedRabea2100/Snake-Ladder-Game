const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db= require('./models')
const playerRoutes = require ('./routes/playerRoutes')

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//testing login and Registeration routes
app.use('/players',playerRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

