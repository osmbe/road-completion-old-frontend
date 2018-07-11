var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongodb server");
});

//mongoose.connect('mongodb://osoctest:osoc123@ds139890.mlab.com:39890/osoc18road',{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/osoc18road',{ useNewUrlParser: true });

require('./models/Issue');

var indexRouter = require('./routes/index');

var app = express();


let cors = require('cors');
app.use(cors({origin: "*"}));
// view engine setup
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/API/', indexRouter);

app.listen(3000,function(){
  console.log("App running on port 3000");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
