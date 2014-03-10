var urlbase = "http://127.0.0.1:8080/";

function Campeonato(id) {
    this.id = id;
}

/***
 *
 * @param {String} callback
 * @returns {undefined}
 */
Campeonato.get = function(id, callback) {
    callService(urlbase + "campeonatos/" + id, "GET", callback);
};

// <editor-fold defaultstate="collapsed" desc="callService">
function callService(urlService, callType, callBackFunction) {
    $.ajax({
        dataType: "json",
        url: urlService,
        type: callType,
//        data: args,
//        crossDomain: true,
        success: function(data) {
            eval(callBackFunction)(data);
        }, error: function(data, status, errorThrown) {
            console.log(status + ">>  " + errorThrown);
        }});
}
// </editor-fold>