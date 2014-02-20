var http = require('http');
var restify = require('restify');
var mongojs = require('mongojs');

var server = restify.createServer({name : 'myapp'});

var ipAdd = '127.0.0.1';
var port = '8080';

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get({path : '/campeonatos' + '/:userId', version : '0.0.1'}, findChampionships);

var db = mongojs('127.0.0.1:27017/chicken');

server.listen(port, ipAdd, function(){
    console.log(server.name + ' escuchando por ' + server.url);
});

//function findChampionships(req, res, next){
//    var pollas = [];
//    console.log("entered " + req.params.userId);
//    db.collection('chickens').find({}).toArray(function(err, chickens){
//       if(err) throw err;
//       
//       chickens.forEach(function(chicken){
//           var users = chicken.users;
//           for(var i = 0; i < users.length; i++){
//               if(users[i]['id'] == req.params.userId){
//                   pollas.push(chicken);
//               }
//           }
//       });
//       res.send(200, pollas);
//    });
//    
//    return next();
//}

function findChampionships(req, res, next){
    console.log("entered " + req.params.userId);
    db.collection('chickens').find({'users' : {'$elemMatch' : {'id' : parseInt(req.params.userId)}}}).toArray(function(err, chickens){
       if(err) {throw err};
       console.dir(chickens.length);
       res.send(200, chickens);
       return next();
    });
}


