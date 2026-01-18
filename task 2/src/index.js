let express = require('express')
let router = require('./routes/route')
let app = express()

app.use(express.json())

app.use('/', router)

app.use((req, res) => {
    return res.status(404).send({ status: false, message: "Path Not Found" })
});

app.listen(3000, () => {
    console.log(`Express app running on port 3000`)
})