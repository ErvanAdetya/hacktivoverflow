require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const votesRouter = require('./routes/votes');

const app = express();

mongoose.connect(process.env.DB, (err) => {
  if(!err) {console.log('Connected to Database');}
  else {throw new Error(err);}
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/votes', votesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
