var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs')
const typeDefs = fs.readFileSync('./graphql/schema.gql', 'utf-8')
const resolvers = require('./graphql/resolvers')
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

var index = require('./routes/index');
var users = require('./routes/users');
var movies = require('./routes/movies');
var tvs = require('./routes/tvs');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/movies', movies);
app.use('/tvs', tvs);
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ error: err.message })
  // render the error page
});

module.exports = app;
