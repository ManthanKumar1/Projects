const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const router = require('./routes/route')

const app = express()
dotenv.config()

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/', router)

app.use(function (req, res) {
    return res.status(400).send({ status: false, message: "Path Not Found" })
})

mongoose.connect(process.env.mongodb)
    .then(() => console.log("MongoDB is connected successfully"))
    .catch(err => console.log(err))

app.listen(process.env.PORT, function () {
    console.log("Express app running on Port " + process.env.PORT)
})