
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./controllers')
  , recipe = require('./controllers/recipe')
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
app.get('/recipes', recipe.list);
app.get('/recipe/:id', recipe.show);
app.get('/recipe/:id/edit', recipe.edit);
app.post('/recipe/:id', recipe.update);

mongoose.connect('localhost', 'mealPlanner');
mongoose.connection.on('error', function(err) {
	console.log("MongoDB error");
	console.dir(err);
});
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb');
	http.createServer(app).listen(app.get('port'), function(){
		console.log("Express server listening on port " + app.get('port'));
	});
});