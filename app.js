/**
 * Configuration
 */

/**
 * Module dependencies
 */
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    lessMiddleware = require('less-middleware');


var app = module.exports = express();
app.configure(function() {
    app.use(lessMiddleware({src: __dirname + '/public',compress: true }));

});


//all environments
app.set('port', process.env.APP_PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());


app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

/**
 * Routes
 */
//serve index and view partials
app.get('/', routes.index);
app.get('/apache-logs/hosts', routes.hosts);
app.get('/apache-logs/request', routes.request);

//redirect others
app.get('*', routes.index);

/**
 * Start Server
 */
var ip = process.env.APP_IP || '0.0.0.0';
var server = http.createServer(app);
server.listen(app.get('port'), ip, function(){
    console.log('Server listening on port ' + app.get('port') + ip);
});





