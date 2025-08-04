const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const parseFormData = multer().none()

let { signup, login, getUser } = require('../controllers/userController')
const { createBook, getBook, requestBook, updateRequestStatus, showRemove, updateBook, deleteBook, getBookImage, searchBook, filterBook } = require('../controllers/bookController')

let {authentication} = require('../middlewares/auth')

// user
router.post('/signup', parseFormData, signup)
router.post('/login', parseFormData, login)
router.post('/getUser', authentication, parseFormData, getUser)

// book
router.post('/createBook', authentication, upload.array('image', 5), createBook)
router.get('/getBook', getBook)
router.post('/requestBook', authentication, parseFormData, requestBook)
router.post('/updateRequestStatus', authentication, parseFormData, updateRequestStatus)
router.get('/showRemove', authentication, parseFormData, showRemove)
router.post('/updateBook', authentication, upload.array('image', 5), updateBook)
router.post('/deleteBook', authentication, parseFormData, deleteBook)
router.get('/getBookImage', getBookImage)
router.get('/searchBook', searchBook)
router.get('/filterBook', filterBook)

module.exports = router