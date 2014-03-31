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
function getPoolById(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('pools').findOne({'_id' : new ObjectID(req.params.poolId)}, 
        function(err, pool){
            if(err){
                res.send(501, err);
                return next(err);
            }
            if(pool){
                res.send(200, pool);
            }
        }
    );
}

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
                res.send(501, err);
                return next();
            }
            //Busca la polla para ver si está cerrada.
            db.collection('pools').findOne({'_id' : new ObjectID(req.params.poolId)},
                function(err, dbPool){
                    if(err){
                        res.send(501, err);
                        return next(err);
                    }
                    if(dbPool){
                        //si está cerrada.
                        if(dbPool.status == "closed"){
                            res.send(200, 'false');
                            return next();
                        }
                        else{
                            if(doc){
                                for(var i = 0; i < doc.pools.length; i++){
                                    if(doc.pools[i].poolId == req.params.poolId){
                                        res.send(200, 'true');
                                        return next();
                                    }
                                }
                                res.send(200, 'false');
                                return next();
                            }
                        }
                    }
                    else{
                        res.send(200, 'false');
                        return next();
                    }
                }
            );
            return next();
        }
    );
    return next();
}

function getUsersInPool(req, res, next){
    //Buscar los usuarios que estén registrados a la polla con
    //poolId
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('users').find({'pools' : {'$elemMatch' : {'poolId': parseInt(req.params.poolId)}}}).toArray(
        function(err, users){
            if(err){
                res.send(501, err);
                return next(err);
            }
            if(users){
                res.send(200, users);
                return next();
            }
            res.send(200, []);
            return next();
        }
    );
}
// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="POST services">
function insertUser(req, res, next){
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
    //upsert user object with new pool.
    db.collection('users').update({'_id' : req.params.userId}, {$addToSet: {'pools' : {'poolId' : req.params.poolId}}},
        function(err){
            if(err){
                res.send(501, err);
                return next(err);
            }
            db.collection('pools').findOne({'_id' : new ObjectID(req.params.poolId)}, {'stages' : false},
                function(err, pool){
                    if(err){
                        res.send(501, err);
                        return next(err);
                    }
                    if(pool){
                        res.send(200, pool);
                        return next();
                    }
                    res.send(200);
                    return next();
                }
            );
        }
    );
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
exports.getUsersInPool = getUsersInPool;
exports.insertUser = insertUser;
exports.insertPool = insertPool;
exports.registerUserToPool = registerUserToPool;