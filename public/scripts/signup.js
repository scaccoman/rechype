/* global $ */

$("#signupNav").addClass("active");

    //   $("#signupBtn").click(function(){
    //         var userData = {};
    //         userData.username = $("#username").val();
    //         userData.password = $("#password").val();
    //         var confirmPsw = $("#confirmPsw").val();
    //         if (userData.password !== confirmPsw){
    //           errorMsg("You passwords do not match!");
    //         } else if (userData.username !== "" && userData.password !== "") {
    //             $.ajax({
    //                  type: "POST",
    //                  url: "/user/signup",
    //                  data: JSON.stringify(userData),
    //                  processData: false,
    //                  contentType: "application/json; charset=utf-8",
    //                  success: function(msg) {
    //                      if (!msg.errorName) {
    //                          successMsg("New account created!");
    //                          setTimeout(function(){
    //                             window.location.replace("/home");
    //                          }, 3000);
    //                      } else {
    //                          errorMsg(msg.errorMessage);
    //                      }
                         
    //                  }
    //             });
    //         }  else {
    //             errorMsg("Username and Password are mandatory fields");
    //         }
            
    //      });