let express = require('express')
let app = express()
let multer = require('multer')
let dotenv = require('dotenv')
let cors = require('cors')
let router = require('./routes/route')
let db = require('./dbConnection')

dotenv.config()

app.use(express.json())

app.use(multer().any())

app.use(cors({
    origin: '*'
}))

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database.');
// })

app.use('/', router)

app.use(function (req, res) {
    return res.status(400).send({ status: false, message: "Path Not Found" })
})

app.listen(3000, function () {
    console.log("Express app running on Port " + (3000))
})