let express = require('express')
let mongoose = require('mongoose')
let app = express()
let multer = require('multer')
let cors = require('cors')
let route = require('./routes/route')

app.use(express.json())
app.use(multer().any())

app.use(cors({
    origin: '*'
}))

mongoose.connect("mongodb+srv://manthankumar:Password@cluster0.gax1eez.mongodb.net/urban")
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err))

app.use('/', route)

app.listen(process.env.port || 3000, function () {
    console.log('Express app running on port ' + 3000)
})