 /* global $ */
 /* global successMsg errorMsg */
 
 $("#settingsNav").addClass("active");
 
      $("#savePreference").click(function(){
            var userPreferences = {};
            userPreferences.fontFamily = $("#username").val();
            userPreferences.backgroundColor = "#" + $("#backgroundColor").val();
                $.ajax({
                     type: "POST",
                     url: "/settings",
                     data: JSON.stringify(userPreferences),
                     processData: false,
                     contentType: "application/json; charset=utf-8",
                     success: function(msg) {
                         if (msg.message){
                             successMsg(msg.message);
                         } else {
                             errorMsg(msg.error);
                         }
                         console.log("success")
                     }
                });
         });
    
         
         function update(jscolor) {
            $('body').css("backgroundColor", "#" + jscolor);
        }