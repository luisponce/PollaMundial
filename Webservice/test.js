var http = require('http');
var restify = require('restify');
var mongojs = require('mongojs');
var ObjectId = require("mongojs").ObjectId;

var server = restify.createServer({name : 'myapp'});

var ipAdd = '127.0.0.1';
var port = '8080';

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get({path : '/campeonatos' + '/:userId', version : '0.0.1'}, findChampionships);
server.get({path : '/campeonato' + '/:chickenId', version : '0.0.1'}, findChampionshipById);

var db = mongojs('127.0.0.1:27017/chicken');

server.listen(port, ipAdd, function(){
    console.log(server.name + ' escuchando por ' + server.url);
});

function findChampionships(req, res, next){
    db.collection('chickens').find({'users' : {'$elemMatch' : {'id' : parseInt(req.params.userId)}}}).toArray(function(err, chickens){
       if(err) {throw err};
       res.send(200, chickens);
       return next();
    });
}

function findChampionshipById(req, res, next){
    db.collection('chickens').find({'_id' : new ObjectId(req.params.chickenId)}, function(err, chicken){
       if(err){throw err;}
       res.send(200, chicken);
       return next();
    });
}




