// <editor-fold defaultstate="collapsed" desc="hola">

var http = require('http');
var restify = require('restify');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var handlers = require('./handlers');
// </editor-fold>
var server = restify.createServer({name : 'myapp'});

var ipAdd = '127.0.0.1';
var port = '8080';

mongoClient.connect('mongodb://localhost:27017/chicken', function(err, dbInst){
    if(err){
        throw err;
    }
    handlers.setDB(dbInst);
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get({path : '/pool' + '/:userId'}, handlers.getPoolsByUserId);
server.get({path : '/pool' + '/:poolId' + "/:userId"}, handlers.checkUserRegistration);

server.post('/user', handlers.insertUser);
server.post('/pool', handlers.insertPool);

server.listen(port, ipAdd, function(){
    console.log(server.name + ' listening in ' + server.url);
});