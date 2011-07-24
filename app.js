
/**
 * Module dependencies.
 */

var express = require('express');
app = module.exports = express.createServer();
require('./models/foursquare');
// Configuration

app.configure(function() {
   app.set('views', __dirname + '/views');
   app.set('view engine', 'jade');
   app.use(express.bodyParser());
   app.use(express.cookieParser());
   app.use(express.session({ secret: "h7f74hghs" }));
   app.use(express.methodOverride());
   app.use(app.router);
   app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
require('./controllers/home');
require('./controllers/buy');
require('./controllers/bank');

app.listen(process.env.C9_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


