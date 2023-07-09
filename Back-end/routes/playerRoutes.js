const express = require('express')
const playerController = require('../controllers/playerController')
const { signup, login } = playerController
const userAuth = require('../middleware/playerAuthentication')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.savePlayer, signup)

//login route
router.post('/login', login )

module.exports = router