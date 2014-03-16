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
}

function checkUserRegistration(req, res, next){
    //Buscar la polla y revisar si está cerrada. si no, ver si el
    //usuario está registrado.
}

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="POST services">
function registerUser(req, res, next){
    //Registrar el usuario. Si algo sale mal, retornar falso.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.collection('users').insert(JSON.parse(req.params.user), 
        function(err, doc){
            if(err){
                res.send(500, "false");
                throw err;
            }
            else{
                res.send(200, "true");
            }
        }
    );    
}

function registerUserToPool(req, res, next){
    //Registrar un usuario en una polla. Retornar falso si pasa algo.
}


// </editor-fold>

function setDB(dbCon){
    db = dbCon;
}

exports.setDB = setDB;
exports.getPools = getPools;
exports.getPoolById = getPoolById;
exports.getPoolsByUserId = getPoolsByUserId;
exports.checkUserRegistration = checkUserRegistration;