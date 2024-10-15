let express = require('express')
let router = express.Router()

let { createUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController')
let { sendMessage, viewMessage } = require('../controllers/messageController')

let { authentication } = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/loginUser', loginUser)
router.get('/getUser', getUser)
router.post('/updateUser/:uuid', updateUser)
router.post('/deleteUser/:uuid', deleteUser)

router.post('/sendMessage', sendMessage)
router.get('/viewMessage', viewMessage)

module.exports = router