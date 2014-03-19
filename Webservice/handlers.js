var ObjectID = require('mongodb').ObjectID;
var db;

// <editor-fold defaultstate="collapsed" desc="GET services">
//function getPools(req, res, next){
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    db.collection('pools').find({'users' : {'$elemMatch' : {'id' : req.params.userMail}}}).toArray(function(err, chickens){
//       if(err) {throw err};
//       res.send(200, chickens);
//    });
//}
//
//function getPoolById(req, res, next){
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    db.collection('pools').findOne({'_id' : new ObjectID(req.params.chickenId)}, function(err, chicken){
//       if(err){throw err;}
//       console.dir(chicken);
//       res.send(200, chicken);
//    });
//}

function getPoolsByUserId(req, res, next){
    //Retorna la lista de pollas a las que está registrado el
    //userID (mail)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var query  = {'_id' : req.params.userId};
    var projection = {
        '_id' : false,
        'name' : false,
        'username' : false,
        'password' : false,
        'pic' : false
    };
    db.collection('users').findOne(query, projection,
        function(err, doc){
            if(err){
                res.send(501, err);
                return next(err);
            }
            if(doc){
                var poolIds = [];
                for(var i = 0; i < doc.pools.length; i++){
                    poolIds.push(doc.pools[i].poolId);
                    console.dir(poolIds[poolIds.length - 1] + "  ");
                }
                //TODO: fix '_id ' should be '_id' (no space).
                db.collection('pools').find({'_id ' : {$in : poolIds}}).toArray(
                    function(err, pools){
                        if(err){
                            res.send(501, err);
                            return next(err);
                        }
                        if(pools){
                            res.send(200, pools);
                        }
                    }
                );
            }
            else{
                return next(new Error("Nothing found"));
            }
        }
    );
}

function checkUserRegistration(req, res, next){
    //Buscar la polla y revisar si está cerrada. si no, ver si el
    //usuario está registrado.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('users').findOne({'_id' : req.params.userId},
        function(err, doc){
            if(err){
                res.send(200, 'false');
                return next();
            }
            if(doc){
                for(var i = 0; i < doc.pools.length; i++){
                    if(doc.pools[i].poolId == req.params.poolId){
                        res.send(200, 'false');
                    }
                }
                res.send(200, 'true');
                return next();
            }
        }
    );
}

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="POST services">
function insertUser(req, res, next){
    console.dir("registering");
    //Registrar el usuario. Si algo sale mal, retornar falso.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    db.collection('users').insert(req.params.user, 
        function(err, doc){
            if(err){
                res.send(500, "false");
                return next();
            }
            else{
                res.send(200, "true");
                return next();
            }
        }
    );    
}

function registerUserToPool(req, res, next){
    //Registrar un usuario en una polla. Retornar falso si pasa algo.
}

function insertPool(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('pools').insert(req.params.pool, 
        function(err, doc){
            if(err){
                res.send(501, err);
                return next(err);
            }
            res.send(200, "true");
            return next();
        }
    );   
}


// </editor-fold>

function setDB(dbCon){
    db = dbCon;
}

exports.setDB = setDB;
//exports.getPools = getPools;
//exports.getPoolById = getPoolById;
exports.getPoolsByUserId = getPoolsByUserId;
exports.checkUserRegistration = checkUserRegistration;
exports.insertUser = insertUser;
exports.insertPool = insertPool;