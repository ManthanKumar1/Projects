let express = require('express')
let router = express.Router()
let { createUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController')
const {authentication} = require('../middlewares/auth')

router.get('/test', async function (req, res){
    return res.status(200).send({status: true, message: "Code running perfectly"})
})

// user
router.post('/api/users', createUser)
router.post('/api/loginUser', loginUser)
router.get('/api/users', getUser)
router.put('/api/users/:id', authentication, updateUser)
router.delete('/api/deleteUser/:id', authentication, deleteUser)

module.exports = router