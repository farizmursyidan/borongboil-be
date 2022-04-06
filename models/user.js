const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const User = dbBorongBoil.model('User', userSchema, 'user')

module.exports = User