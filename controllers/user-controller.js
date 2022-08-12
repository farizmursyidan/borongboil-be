require('../db/connection')
const User = require('../models/user');
const bcrypt = require('bcryptjs')

const loginUser = async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (username && password) {
    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(401).send({ "error": "Incorrect Username or Password!" })
    }

    let checkPassword = bcrypt.compareSync(password, user.password)

    if (checkPassword) {
      req.session.loggedin = true;
      req.session.username = username;
      res.status(200).send({
        "code": 200,
        "status": "OK",
        "data": {
          "login_status": "logged_in",
          "username": username,
          "role": !user.role ? "" : user.role
        }
      })
    } else {
      return res.status(401).send({
        "code": 401,
        "status": "Incorrect Username or Password!",
        "data": {
          "login_status": "login_failed"
        }
      })
    }
  } else {
    return res.status(401).send({
      "code": 401,
      "status": "Please enter Username and Password!",
      "data": {
        "login_status": "login_failed"
      }
    })
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy((err) => { })
  res.send({ "login_status": "logged_out" })
}

const getUser = async (req, res) => {
  if (req.session.loggedin) {
    try {
      const user = await User.find();
      res.status(200).send({ data: user })
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const createUser = async (req, res) => {
  let bodyData = req.body;
  const user = await User.findOne({ username: bodyData.username })

  if (user) {
    return res.status(401).send({ "error": "Username has been taken!" })
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(bodyData.password, salt);

  bodyData.password = hash
  bodyData.affiliate_link = 'https://borongboil.id/?m=' + bodyData.username

  try {
    const newUser = new User({
      ...bodyData
    });
    await newUser.save();
    res.status(201).send({ data: newUser })
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" })
  }
}

const updateUser = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id
    const data = req.body;

    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(401).send({ "error": "User is not found!" })
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
      const bulkResult = await User.bulkWrite(bulkOps)

      res.status(200).send(bulkResult)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal Server Error" })
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

const deleteUser = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id

    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(401).send({ "error": "User is not found!" })
    }

    try {
      const deleteData = await User.deleteOne({ _id: id })

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
  loginUser: loginUser,
  logoutUser: logoutUser,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}