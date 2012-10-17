
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./controllers')
  , user = require('./controllers/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.index);
app.get('/users', user.list);

var db = mongoose.createConnection('mongodb://localhost/mealPlanner');
db.on('error', function(err) {
	console.log("Can't connect to mongodb");
	console.dir(err);
});
db.on('open', function() {
	console.log('Connected to mongodb');
	http.createServer(app).listen(app.get('port'), function(){
		console.log("Express server listening on port " + app.get('port'));
	});
});
