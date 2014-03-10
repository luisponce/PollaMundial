var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/chicken', function(err, db){
    if(err){
        throw err;
    }
    
    for(var i = 10; i < 30; i++){
        var user = {
            "_id" : "user" + i + "@gmail.com",
            "name" : "Poncio" + i,
            "username" : "lponce" + i,
            "password" : "olasoiponse",
            "idGoogle" : "",
            "idFacebook" : "",
            "pic" : "www.sddw.png"
        }
        db.collection('users').insert(user, function(err, records){
            if(err) throw err;
        });
    }
});

