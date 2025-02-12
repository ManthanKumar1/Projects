let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    age: { type: String, required: true, trim: true },
    isDeleted: {type: Boolean, default: false}
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)