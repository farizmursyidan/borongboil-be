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
      res.send({ "login_status": "logged_in" })
    } else {
      return res.status(401).send({ "error": "Incorrect Username or Password!" })
    }
  } else {
    return res.status(401).send({ "error": "Please enter Username and Password!" })
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy((err) => { })
  res.send({ "login_status": "logged_out" })
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

module.exports = {
  loginUser: loginUser,
  logoutUser: logoutUser,
  createUser: createUser
}