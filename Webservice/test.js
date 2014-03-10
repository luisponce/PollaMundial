var http = require('http');
var restify = require('restify');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var server = restify.createServer({name : 'myapp'});

var ipAdd = '127.0.0.1';
var port = '8080';

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get({path : '/campeonatos' + '/:userMail', version : '0.0.1'}, findChampionships);
server.get({path : '/campeonato' + '/:chickenId', version : '0.0.1'}, findChampionshipById);

var db;

mongoClient.connect('mongodb://localhost:27017/chicken', function(err, dbInst){
    if(err){
        throw err;
    }
    db = dbInst;
});

server.listen(port, ipAdd, function(){
    console.log(server.name + ' listening in ' + server.url);
});

function findChampionships(req, res, next){
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('chickens').find({'users' : {'$elemMatch' : {'id' : req.params.userMail}}}).toArray(function(err, chickens){
       if(err) {throw err};
       res.send(200, chickens);
    });
}

function findChampionshipById(req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('chickens').findOne({'_id' : new ObjectID(req.params.chickenId)}, function(err, chicken){
       if(err){throw err;}
       console.dir(chicken);
       res.send(200, chicken);
    });
}




