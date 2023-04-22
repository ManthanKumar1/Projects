const express = require("express") // framework
const mongoose = require("mongoose") // library 
const bodyParser = require('body-parser'); // package (third party middleware)
const route = require('./routes/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Postman

mongoose.connect("mongodb+srv://manthankumar:DRdwwpc5da3xwXTV@cluster0.gax1eez.mongodb.net/Manthan29-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true //Skip
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


