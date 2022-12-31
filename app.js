const express = require('express');
const router = require('./src/routes/api')
const app = express();
const bodyParser = require('body-parser')

// security middleware
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// database lib import
const mongoose = require('mongoose');

// security middleware implementation


app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// body parser implimentation
app.use(bodyParser.json());

// request rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/Todo',{ autoIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// routing implementation
app.use('/api/v1', router)

// undefined route handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid route'
  })
})

module.exports = app;