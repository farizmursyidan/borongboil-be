const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')

const carDetailSchema = new mongoose.Schema({
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
  },
  tahun: {
    type: Number,
    required: true
  },
  transmisi: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  nomor_telepon: {
    type: String,
    required: true
  },
  area_inspeksi: {
    type: String,
    required: true
  }
})

const CarDetail = dbBorongBoil.model('CarDetail', carDetailSchema, 'car_detail')

module.exports = CarDetail