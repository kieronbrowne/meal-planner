
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./controllers')
  , recipe = require('./controllers/recipe')
  , meal = require('./controllers/meal')
  , tag = require('./controllers/tag')
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
  app.use(express.static(path.join(__dirname, 'clientjs')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.index);

app.get('/recipe', recipe.list);
app.get('/recipe/:id', recipe.show);
app.get('/recipe/:id/edit', recipe.edit);
app.post('/recipe/:id/addIngredient', recipe.addIngredient);
app.delete('/recipe/:id/ingredient/:ingId', recipe.removeIngredient);
app.put('/recipe/:id', recipe.update);
app.post('/recipe', recipe.create);

app.get('/meal', meal.find);
app.get('/meal/calendar', meal.calendar);
app.get('/meal/new', meal.editNew);
app.get('/meal/:id', meal.edit);
app.post('/meal', meal.create);
app.put('/meal/:id', meal.update);
app.delete('/meal/:id', meal.delete);

app.get('/tag', tag.find);
app.post('/tag', tag.create);
app.put('/tag/:id', tag.update);
app.delete('/tag/:id', tag.delete);

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
