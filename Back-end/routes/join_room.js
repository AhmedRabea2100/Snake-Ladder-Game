const express = require('express')
const { MakeMoveController, JoinController } = require('../controllers/join.controller')


const router = express.Router()

router
    .route('/join/')
    .post(JoinController)

module.exports = router