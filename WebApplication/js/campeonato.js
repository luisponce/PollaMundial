var User = new Object();
var Pool = new Object();

var passes = 0;
var fails = 0;
var counter = 1;
// Fake Data
var Data = [
    [
        [{"name": "Erik Zettersten", "id": "erik-zettersten", "seed": 1, "displaySeed": "D1", "score": 47},
            {"name": "Andrew Miller", "id": "andrew-miller", "seed": 2}],
        [{"name": "James Coutry", "id": "james-coutry", "seed": 3}, {"name": "Sam Merrill", "id": "sam-merrill", "seed": 4}],
        [{"name": "Anothy Hopkins", "id": "anthony-hopkins", "seed": 5}, {"name": "Everett Zettersten", "id": "everett-zettersten", "seed": 6}],
        [{"name": "John Scott", "id": "john-scott", "seed": 7}, {"name": "Teddy Koufus", "id": "teddy-koufus", "seed": 8}],
        [{"name": "Arnold Palmer", "id": "arnold-palmer", "seed": 9}, {"name": "Ryan Anderson", "id": "ryan-anderson", "seed": 10}],
        [{"name": "Jesse James", "id": "jesse-james", "seed": 1}, {"name": "Scott Anderson", "id": "scott-anderson", "seed": 12}],
        [{"name": "Josh Groben", "id": "josh-groben", "seed": 13}, {"name": "Sammy Zettersten", "id": "sammy-zettersten", "seed": 14}],
        [{"name": "Jake Coutry", "id": "jake-coutry", "seed": 15}, {"name": "Spencer Zettersten", "id": "spencer-zettersten", "seed": 16}]
    ],
    [
        [{"name": "Erik Zettersten", "id": "erik-zettersten", "seed": 1}, {"name": "James Coutry", "id": "james-coutry", "seed": 3}],
        [{"name": "Anothy Hopkins", "id": "anthony-hopkins", "seed": 5}, {"name": "Teddy Koufus", "id": "teddy-koufus", "seed": 8}],
        [{"name": "Ryan Anderson", "id": "ryan-anderson", "seed": 10}, {"name": "Scott Anderson", "id": "scott-anderson", "seed": 12}],
        [{"name": "Sammy Zettersten", "id": "sammy-zettersten", "seed": 14}, {"name": "Jake Coutry", "id": "jake-coutry", "seed": 15}]
    ],
    [
        [{"name": "Erik Zettersten", "id": "erik-zettersten", "seed": 1}, {"name": "Anothy Hopkins", "id": "anthony-hopkins", "seed": 5}],
        [{"name": "Ryan Anderson", "id": "ryan-anderson", "seed": 10}, {"name": "Sammy Zettersten", "id": "sammy-zettersten", "seed": 14}]
    ],
    [
        [{"name": "Erik Zettersten", "id": "erik-zettersten", "seed": 1}, {"name": "Ryan Anderson", "id": "ryan-anderson", "seed": 10}]
    ],
    [
        [{"name": "Erik Zettersten", "id": "erik-zettersten", "seed": 1}]
    ]
];

$(document).ready(function() {

    $("#btn-guardar").click(function() {

        var p_id = Pool.id;
        var s_id;
        var forecasts = $("#pronostico_input").find("tr");

        forecasts.each(function() {
            var matchId = $(this).attr('id');//get match id

            //get the input
            var inputFields = $(this).find("input");
            var input = [inputFields.first().val(), inputFields.last().val()];

            //crear el match a guardar en forecasts
            var match;
            match.matchId = matchId;
            match.team1 = input[0];
            match.team1 = input[1];

            //guarda el forecast
            //encontrar el pool
            var poolFound = false;
            var stageFound = false;
            User.pools.some(function(element, index, array) {
                if (element.poolId === p_id) {
                    //encontrar el stage
                    element.stages.foreach(function(elm, i, arr) {
                        if (elm.stageId === s_id) {
                            //guardar el forecast
                            elm.forecast.put(match);

                            stageFound = true;
                            return true;
                        }
                    });

                    poolFound = true;
                    return true;
                }
            });
            if (!poolFound) {
                console.log("El usuario no tiene ningun pool de id: " + p_id);
            } else if (!stageFound) {
                console.log("El pool " + p_id +
                        " no tiene nignun stage de id: " + s_id);
            }

        });

//        var forecast = $("#pronostico_input tr");

//    guardar la informacion del pronostico del usuario
    });

});

