const express = require('express')
const router = express.Router()

let {authentication} = require('../middlewares/auth')

let { signup, login } = require('../controllers/userController')

router.post('/signup', signup)
router.post('/login', login)

module.exports = router