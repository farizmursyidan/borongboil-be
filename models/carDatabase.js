const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')

const carDatabaseSchema = new mongoose.Schema({
  merk: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  varian: {
    type: String,
    required: true
  }
})

const CarDatabase = dbBorongBoil.model('CarDatabase', carDatabaseSchema, 'car_database')

module.exports = CarDatabase