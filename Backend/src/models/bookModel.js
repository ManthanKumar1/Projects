let mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  condition: { type: String, enum: ["Good", "Bad", "Moderate"], required: true },
  image: { type: [String], default: null },
  originalPrice: { type: String, required: true },
  price: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requests: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
  }],
  remove: {type: Boolean, default: false},
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)