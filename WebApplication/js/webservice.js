var urlbase = "http://localhost/";

function Campeonato() {

}

/***
 *
 * @param {String} callback
 * @returns {undefined}
 */
Campeonato.get = function(id, callback) {

    var params = {command: "get", userId: id};
    callService(urlbase, params, "GET", callback);
};

// <editor-fold defaultstate="collapsed" desc="callService">
function callService(urlService, args, callType, callBackFunction) {
    $.ajax({
        dataType: "jsonp",
        url: urlService,
        data: args,
        type: callType,
        crossDomain: true,
        success: function(data) {
            eval(callBackFunction)(data);
        }, error: function(e, xhr) {
            console.log(e);
        }});
}
// </editor-fold>