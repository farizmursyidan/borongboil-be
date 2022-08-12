const CarDetail = require('../models/carDetail');
const CarDatabase = require('../models/carDatabase');
const CarInspection = require('../models/carInspection');
const Amount = require('../models/amount');
const { queryHandler } = require('../components/searchingMethods')

const path = require('path')
const asyncLib = require('async')
const uniqueFilename = require('unique-filename')

const getCarDetail = async (req, res) => {
  if (req.session.loggedin) {
    let queryObject = {}

    if (req.query !== undefined) {
      queryObject = req.query
    }

    try {
      const { query, projection, options, page } = await queryHandler(queryObject)
      const countQueryData = await CarDetail.find(query).countDocuments()
      const carDetail = await CarDetail.find(query, projection, options);
      res.status(200).send({
        code: 200,
        status: "OK",
        data: carDetail,
        maxResults: options.limit,
        page,
        totalResults: countQueryData
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        code: 500,
        status: "Internal Server Error"
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      status: "Unauthorized"
    })
  }
}

const createCarDetail = async (req, res) => {
  let bodyData = req.body;
  try {
    let amountTmp = await Amount.find({ document: "car-detail" })
    let date = new Date()

    if (amountTmp.length > 0) {
      amountTmp = amountTmp[0]['count']
    } else {
      amountTmp = 0
      const amountCarDetail = new Amount({
        document: "car-detail"
      })
      amountCarDetail.save()
    }

    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    let cl_id = "CL" + '-' + year + month + day + '-' + amountTmp.toString().padStart(4, '0')

    bodyData.update_status = 'Menunggu Konfirmasi'

    const newCarDetail = new CarDetail({
      cl_id,
      ...bodyData
    });
    await newCarDetail.save();
    ++amountTmp
    await Amount.findOneAndUpdate({ document: "car-detail" }, { count: amountTmp }, { upsert: true })
    res.status(201).send({ data: newCarDetail })
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" })
  }
}

const updateCarDetail = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id
    const data = req.body;

    const carDetail = await CarDetail.findOne({ _id: id })

    if (!carDetail) {
      return res.status(401).send({
        code: 401,
        status: "Car detail is not found!"
      })
    }

    try {
      const bulkOps = []
      let dataObject = data
      delete dataObject._id
      let dataUpdate = {
        'updateOne': {
          'filter': { '_id': id },
          'update': dataObject
        }
      }
      bulkOps.push(dataUpdate)
      const bulkResult = await CarDetail.bulkWrite(bulkOps)

      res.status(200).send({
        code: 200,
        status: "OK",
        data: bulkResult
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        code: 500,
        status: "Internal Server Error"
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      status: "Unauthorized"
    })
  }
}

const deleteCarDetail = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id

    const carDetail = await CarDetail.findOne({ _id: id })

    if (!carDetail) {
      return res.status(401).send({ "error": "Car detail is not found!" })
    }

    try {
      const deleteData = await CarDetail.deleteOne({ _id: id })

      res.status(200).send(deleteData)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const getCarDatabaseLandingPage = async (req, res) => {
  try {
    const carDatabase = await CarDatabase.find();
    res.status(200).send({ data: carDatabase })
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

const getCarDatabase = async (req, res) => {
  if (req.session.loggedin) {
    let queryObject = {}

    if (req.query !== undefined) {
      queryObject = req.query
    }

    try {
      const { query, projection, options, page } = await queryHandler(queryObject)
      const countQueryData = await CarDatabase.find(query).countDocuments()
      const carDatabase = await CarDatabase.find(query, projection, options);
      res.status(200).send({
        code: 200,
        status: "OK",
        data: carDatabase,
        maxResults: options.limit,
        page,
        totalResults: countQueryData
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        code: 500,
        status: "Internal Server Error"
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      status: "Unauthorized"
    })
  }
}

const createCarDatabase = async (req, res) => {
  if (req.session.loggedin) {
    let bodyData = req.body.data;
    let carData = [];
    const header = bodyData[0]
    const data = bodyData.slice(1)
    for (car of data) {
      let objectData = {}
      header.forEach((h) => {
        objectData[h] = car[header.indexOf(h)]
      })
      const newCarDatabase = new CarDatabase({
        ...objectData
      });
      carData.push(newCarDatabase);
    }
    try {
      const save_car = await CarDatabase.insertMany(carData)
      res.status(201).send({ data: save_car })
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const updateCarDatabase = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id
    const data = req.body;

    const carDatabase = await CarDatabase.findOne({ _id: id })

    if (!carDatabase) {
      return res.status(401).send({ "error": "Car item is not found!" })
    }

    try {
      const bulkOps = []
      let dataObject = data
      delete dataObject._id
      let dataUpdate = {
        'updateOne': {
          'filter': { '_id': id },
          'update': dataObject
        }
      }
      bulkOps.push(dataUpdate)
      const bulkResult = await CarDatabase.bulkWrite(bulkOps)

      res.status(200).send(bulkResult)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const deleteCarDatabase = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id

    const carDatabase = await CarDatabase.findOne({ _id: id })

    if (!carDatabase) {
      return res.status(401).send({ "error": "Car item is not found!" })
    }

    try {
      const deleteData = await CarDatabase.deleteOne({ _id: id })

      res.status(200).send(deleteData)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const getCarMerk = async (req, res) => {
  if (req.session.loggedin) {
    try {
      const carDatabase = await CarDatabase.find({}, { merk: 1 });
      const carMerk = [...new Set(carDatabase.map(({ merk }) => merk))];
      res.status(200).send({
        code: 200,
        status: "OK",
        data: carMerk,
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        code: 500,
        status: "Internal Server Error"
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      status: "Unauthorized"
    })
  }
}

const createInspectionReport = async (req, res) => {
  if (req.session.loggedin) {
    const bodyData = typeof req.body.inspection_report === 'string' ? JSON.parse(req.body.inspection_report) : req.body.inspection_report
    const foto_kendaraan = req.files ? req.files.foto_kendaraan : null
    try {
      const id = bodyData.patch_data._id

      const carDetail = await CarDetail.findOne({ _id: id })

      if (!carDetail) {
        return res.status(401).send({
          code: 401,
          status: "Car detail is not found!"
        })
      }

      const bulkOps = []
      let dataObject = bodyData.patch_data
      let dataUpdate = {
        'updateOne': {
          'filter': { '_id': id },
          'update': dataObject
        }
      }
      bulkOps.push(dataUpdate)
      await CarDetail.bulkWrite(bulkOps)

      if (foto_kendaraan) {
        const images = []

        let foto_content = {}

        let filePath = '../foto-kendaraan/'

        asyncLib.each(foto_kendaraan, function (photo, callback) {
          fileName = uniqueFilename('', 'foto-kendaraan-' + bodyData.informasi_umum.cl_id)
          typeFile = path.extname(photo.name)

          if (photo.truncated) {
            return callback({
              error: {
                code: 413,
                message: "File size limit has been reached."
              }
            })
          }

          photo.mv(path.join(__dirname, filePath) + fileName + typeFile, function (err) {
            if (err) {
              console.log(err)
              return callback(err)
            }
            callback()
          })

          images.push({
            file_name: photo.name,
            system_name: fileName + typeFile,
            extension: typeFile,
            mime_type: photo.mimetype,
            size: photo.size
          })
        })
        foto_content.foto = images
        foto_content.catatan = bodyData.catatan_foto_kendaraan
        bodyData.foto_kendaraan = foto_content
      }

      const newCarInspection = new CarInspection({
        ...bodyData
      });
      await newCarInspection.save();
      res.status(201).send({
        code: 201,
        status: "OK",
        data: newCarInspection
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        code: 500,
        status: "Internal Server Error"
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      status: "Unauthorized"
    })
  }
}

module.exports = {
  getCarDetail,
  createCarDetail,
  updateCarDetail,
  deleteCarDetail,
  getCarDatabase,
  createCarDatabase,
  updateCarDatabase,
  deleteCarDatabase,
  getCarDatabaseLandingPage,
  getCarMerk,
  createInspectionReport
}