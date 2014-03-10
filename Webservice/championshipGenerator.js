var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/chicken', function(err, db){
    if(err){
        throw err;
    }
    
    
    
    for(var i = 10; i < 20; i++){
        var teams = [{teamId : 1}, {teamId : 2}];
        var groups = [
            {'groupId' : 1, 'name' : 'A', 'teams' : []},
            {'groupId' : 2, 'name' : 'B', 'teams' : []}
        ];
        var users = [
            {
                'id' : 'user' + i + '@gmail.com',
                'accepted' : true
            },
            {
                'id' : 'user' + (i + 10) + '@gmail.com',
                'accepted' : (i%2 == 0)
            }
        ];
        var polla = {
            'name' : 'chicken ' + i,
            'stages' : [{'groups' : groups, 'teams' : teams}, {'groups' : groups, 'teams' : teams}],
            'currentStage' : 1,
            'users' : users,
            'bid' : 1000 * i,
            'firstPlace' : 0.7,
            'secondPlace' : 0.2,
            'thirdPlace' : 0.1
        };
        db.collection('chickens').insert(polla, function(err, records){
            if(err) throw err;
        });
    }
});