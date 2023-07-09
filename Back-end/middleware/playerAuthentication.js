//importing modules
const express = require("express");
const db = require("../models");
//Assigning db.users to User variable
 const User = db.player;

//Function to check if username already exist in the database
//this is to avoid having two users with the same username
 const savePlayer = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const playerName = await User.findOne({
     where: {
       username: req.body.username,
     },
   });
   //if username exist in the database respond with a status of 409
   if (playerName) {
     return res.json(409).send("username already taken");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 savePlayer,
};