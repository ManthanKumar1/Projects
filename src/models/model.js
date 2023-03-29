const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
        trim: true
    },
    LastName:{
        type: String,
        required: true,
        trim: true
    },
    Email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Country: {
        type: String,
        required: true,
        trim: true
    },
    State: {
        type: String,
        required: true,
        trim: true
    },
    City: {
        type: String,
        required: true,
        trim: true
    },
    Gender:{
        type: String,
        enum: ["Male", "Female", "Transgender"]
    },
    DateOfBirth:{
        type: Date,
        required: true
    },
    Age:{
        type: Number,
        trim: true
    }
},{timestamps: true})

module.exports = mongoose.model('form',formSchema)