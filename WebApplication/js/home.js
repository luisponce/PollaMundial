$(document).ready(function() {

    var user_id = sessionStorage['polla_user_id'];
    if (user_id === undefined) {
        user_id = 0;
    }

    Campeonato.get(1, function(data) {
        console.log(data[0].name);
    });

//  Campeonato.get("fillCampeonatos");
    fillCampeonatos([{name: "Polla #3"}, {name: "Polla #4"}]);

    function fillCampeonatos(data) {
        data.forEach(function(element) {
            $("#home_table_campeonatos").append("<tr><td> <a href=\"#\">" + element.name + "</a></td></tr>");
        });
    }
});

