let express = require('express')
let mongoose = require('mongoose')
const multer = require('multer')
let router = require('./routes/route')
let app = express()

app.use(express.json())
app.use(multer().any())

mongoose.connect('mongodb://127.0.0.1:27017/user')
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

app.use('/', router)

app.use((req, res) => {
    return res.status(404).send({ status: false, message: "Path Not Found" })
});

app.listen(3000, () => {
    console.log(`Express app running on port 3000`)
})