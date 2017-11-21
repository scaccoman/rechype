 /* global $ */
 /* global successMsg errorMsg */
 
    //   $("#loginBtn").click(function(){
    //         var userData = {};
    //         userData.username = $("#username").val();
    //         userData.password = $("#password").val();
    //         if (userData.username !== "" && userData.password !== "") {
    //             $.ajax({
    //                  type: "POST",
    //                  url: "/user/login",
    //                  data: JSON.stringify(userData),
    //                  processData: false,
    //                  contentType: "application/json; charset=utf-8",
    //                  success: function(msg) {
    //                      successMsg("Authentication successful");
    //                  }
    //             });
    //         }  else {
    //             errorMsg("Username and Password are mandatory fields");
    //         }
            
    //      });
    $("#loginNav").addClass("active");
         
         $("#loginBtn").click(function(){
            var userData = {};
            userData.username = $("#username").val();
            userData.password = $("#password").val();
            console.log(userData.username + " | " + userData.password);
             if (userData.username !== "" && userData.password !== "") {
                 $.post("/user/login", userData);
             } else {
                 errorMsg("Username and Password are mandatory fields");
             }
         });