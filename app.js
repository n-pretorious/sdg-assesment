const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const port = 3000;

var app = express();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });
 
// setup the logger
app.use(morgan(':method :url :status :response-time ms', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/example.com', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  // error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}/example.com`));