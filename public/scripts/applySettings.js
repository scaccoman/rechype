/* global $ */

//APPLY USER SETTINGS
        function getSettings(){
            $.ajax({url: "/getSettings", 
                    dataType: 'json',
                    processData: false, 
                    success: function(data){
                            if (data !== undefined || data !== null){
                                if (data) {
                                    if (data.message) {
                                        console.log(data.message);
                                    } else {
                                        console.log(data.backgroundColor);
                                        if (data.backgroundColor !== "rgb(246, 246, 246)"){
                                            applyUserSettings(data);
                                        }
                                    }
                                }
                                
                        }
            }});
        }
        
        function applyUserSettings(preferenceObj){
            $("body").css("backgroundColor", preferenceObj.backgroundColor);
        }
        
        getSettings();
        
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