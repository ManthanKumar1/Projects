let express = require('express')
let mongoose = require('mongoose')
let dotenv = require('dotenv')
let cors = require('cors')
let path = require('path')
let router = require('./routes/route')

let app = express()
dotenv.config()

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: ['http://localhost:5173', 'https://voluble-mousse-937afe.netlify.app'],
  credentials: true
}))

app.use('/', router)

app.use((req, res) => {
  return res.status(404).send({ status: false, message: "Path Not Found" })
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err))

let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`)
})