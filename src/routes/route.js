const express = require('express')
const router = express.Router()
const {createForm} = require('../controllers/controller')

router.post('/createForm', createForm)

module.exports = router