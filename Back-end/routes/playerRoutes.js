const express = require('express')
const playerController = require('../controllers/playerController')
const { signup, login } = playerController
const userAuth = require('../middleware/playerAuthentication')
// const { extractPlayerId } = require('../middleware/extractPlayerId')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.savePlayer, signup)

//login route
router.post('/login', login )

//testing token endpoint
// router.get('/profile', extractPlayerId, (req, res) => {
//     const playerId = req.playerId;
  
//     // Use the playerId to fetch the player profile or perform any other authenticated action
  
//     res.send(`Player ID: ${playerId}`);
// });

module.exports = router