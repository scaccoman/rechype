/* global $ */
/* global successMsg errorMsg */

        function getIngredients() {
            var ingredientsArr = [];
            $('input.ingredients').each(function() {
                if ($(this).val() !== "") {
                    var newIngredient = $(this).val();
                    ingredientsArr.push(newIngredient);
                    $(this).val("");
                }
            });
            return ingredientsArr;
        }
        
        function resetThumbnails(){
            $(".remove").remove();
        }
        
        function resetIngredients(){
            $(".resetIngredients").remove();
        }
        
        
        $("#newIngredient").click(function() {
            // $("#ingredientsSpacer").prepend("<button class='form-control btn btn-danger' id='newIngredient'><span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span></button>");
            //TO DO: ADD REMOVE INGREDIENT BUTTON
            //ADD SPACE FOR NEW INPUT FIELDS
                $("#ingredientsSpacer").append("<li class='resetIngredients'><input type='text' class='form-control ingredients inputSpacing' style='-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;' placeholder='Ingredient'></li>");
        });
        
        //ADD RECEIPT BUTTON
         $("#newReceipt").click(function(){
            var urlArr = window.location.href.split("/");
            var url    = "/receipts/" + urlArr[4];
            var receiptData = {};
            receiptData.name = $("#name").val();
            receiptData.description = $("#description").val();
            receiptData.image = $("#image").val();
            receiptData.ingredients = getIngredients();
            if (receiptData.name !== "") {
                $.ajax({ //TO DO WORK ON THE AJAX REQUEST FOR PUT ROUTE
                     type: "PUT",
                     url: url,
                     data: JSON.stringify(receiptData),
                     processData: false,
                     contentType: "application/json; charset=utf-8",
                     success: function(msg) {
                         //HANDLING JSON FROM BACKEND
                         var stringifiedMsg = JSON.stringify(msg);
                         var parsedMsg = JSON.parse(stringifiedMsg); //GOOD WAY OF DOING IT
                         //HANDLING JSON FROM BACKEND
                         if (parsedMsg.message) {
                            //  $("#message").html(parsedMsg.message);
                            //  $("#message").removeClass();
                            //  $("#message").addClass("alert alert-success");
                            successMsg(parsedMsg.message);
                            resetThumbnails();
                            resetIngredients();
                            setTimeout(function(){
                                window.location.replace("/home");
                            }, 3000);
                         } else if (parsedMsg.error) {
                            //  $("#message").html(parsedMsg.error);
                            //  $("#message").removeClass();
                            //  $("#message").addClass("alert alert-danger");
                            errorMsg(parsedMsg.error);
                         }
                         //alert alert-danger
                         
                         //reset field values
                         $("#name").val("");
                         $("#description").val("");
                         $("#image").val("");
                     }
                });
            }  else {
                errorMsg("Please enter a valid name!");
            }
            
         });