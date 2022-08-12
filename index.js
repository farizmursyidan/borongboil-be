const express = require('express');
const util = require('util');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const router = require('./routers/router');
const app = express();
const port = process.env.PORT || 5025;

let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: getUnauthorizedResponse
}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

function getUnauthorizedResponse(req) {
  return req.auth ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') : 'No credentials provided'
}

app.use(fileUpload({
  createParentPath: true,
  debug: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
}))

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())

app.use('/', router);

app.listen(port, () => {
  console.log('Server is already up on port', port);
});