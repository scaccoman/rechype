/* global $ */
        
function successMsg(msg){
    $("#message").html(msg);
    $("#message").removeClass();
    $("#message").addClass("alert alert-success");
    $("#message").slideDown(350);
}
        
function errorMsg(msg){
    $("#message").html(msg);
    $("#message").removeClass();
    $("#message").addClass("alert alert-danger");
    $("#message").slideDown(350);
}