const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')

const carDetailSchema = new mongoose.Schema({
  cl_id: {
    type: String,
    required: true
  },
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
  },
  affiliate: {
    type: String,
    required: false,
    default: null
  },
  sub_affiliate: {
    type: String,
    required: false,
    default: null
  },
  marketing_handler: {
    type: String,
    required: false,
    default: null
  },
  inspector_handler: {
    type: String,
    required: false,
    default: null
  },
  flag: {
    type: String,
    required: false,
    default: null
  },
  update_status: {
    type: String,
    required: false,
    default: null
  },
  harga_permintaan: {
    type: String,
    required: false,
    default: null
  },
  harga_penawaran_terakhir: {
    type: String,
    required: false,
    default: null
  },
  harga_final: {
    type: String,
    required: false,
    default: null
  },
  assign_date: {
    type: Date,
    required: false,
    default: null
  }
})

const CarDetail = dbBorongBoil.model('CarDetail', carDetailSchema, 'car_detail')

module.exports = CarDetail