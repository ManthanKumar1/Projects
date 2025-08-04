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
  origin: [
    'http://localhost:5173',
    'https://book-swap-marketplace.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/', router)

app.use((req, res) => {
  return res.status(404).send({ status: false, message: "Path Not Found" })
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit so the app doesn’t hang
  });

let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`)
})