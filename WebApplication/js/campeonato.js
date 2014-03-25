var User = new Object();
var Pool = new Object();


$(document).ready(function() {
    $("#btn-guardar").click(function() {

        var p_id = Pool.id;
        var s_id;

        var forecasts = $("#pronostico_input").find("tr");
        
        forecasts.each(function(){
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
            var poolFound = false; var stageFound = false;
            User.pools.some(function(element, index, array){
                if(element.poolId === p_id){
                    //encontrar el stage
                    element.stages.foreach(function(elm,i,arr){
                        if(elm.stageId === s_id){
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
            if(!poolFound){
                console.log("El usuario no tiene ningun pool de id: " + p_id);
            } else if(!stageFound){
                console.log("El pool " + p_id + 
                        " no tiene nignun stage de id: " + s_id);
            }
            
        });

//        var forecast = $("#pronostico_input tr");
        
//    guardar la informacion del pronostico del usuario
    });

});

