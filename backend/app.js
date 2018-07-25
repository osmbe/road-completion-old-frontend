require('./models/Issue');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');
var app = express();
let cors = require('cors');


//mongoose.connect('mongodb://osoctest:osoc123@ds139890.mlab.com:39890/osoc18road',{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/osoc18road',{ useNewUrlParser: true });
//mongoose.connect('mongodb://mongo:27017/osoc18',{ useNewUrlParser: true });


mongoose.connection.on("open", (ref) => {
  console.log("Connected to mongodb server");
});

app.use(cors({origin: "*"}));
// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/API/', indexRouter);
app.use('/API/notes/', notesRouter);

app.listen(3000, () => {
  console.log("App running on port 3000");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
