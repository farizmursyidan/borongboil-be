const CarDetail = require('../models/carDetail');
const CarDatabase = require('../models/carDatabase');
const { queryHandler } = require('../components/searchingMethods')

const getCarDetail = async (req, res) => {
  if (req.session.loggedin) {
    try {
      const carDetail = await CarDetail.find();
      res.status(200).send({ data: carDetail })
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const createCarDetail = async (req, res) => {
  let bodyData = req.body;
  try {
    const newCarDetail = new CarDetail({
      ...bodyData
    });
    await newCarDetail.save();
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
      return res.status(401).send({ "error": "Car detail is not found!" })
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

      res.status(200).send(bulkResult)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
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
      res.status(200).send({ data: carDatabase, maxResults: options.limit, page, totalResults: countQueryData })
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
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

module.exports = {
  getCarDetail: getCarDetail,
  createCarDetail: createCarDetail,
  updateCarDetail: updateCarDetail,
  deleteCarDetail: deleteCarDetail,
  getCarDatabase: getCarDatabase,
  createCarDatabase: createCarDatabase,
  updateCarDatabase: updateCarDatabase,
  deleteCarDatabase: deleteCarDatabase,
  getCarDatabaseLandingPage: getCarDatabaseLandingPage
}