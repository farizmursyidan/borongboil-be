const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')

const amountSchema = new mongoose.Schema({
  document: {
    type: String
  },
  count: {
    type: Number,
    default: 0
  }
})

const Amount = dbBorongBoil.model('Amount', amountSchema, 'amount')

module.exports = Amount