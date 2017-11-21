/* global $ */
/* global successMsg errorMsg */

$("#newReceiptNav").addClass("active");

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
            var receiptData = {};
            receiptData.name = $("#name").val();
            receiptData.description = $("#description").val();
            receiptData.image = $("#image").val();
            receiptData.category = $("#category").val();
            receiptData.ingredients = getIngredients();
            if (receiptData.name !== "") {
                $.ajax({
                     type: "POST",
                     url: "/data",
                     data: JSON.stringify(receiptData),
                     processData: false,
                     contentType: "application/json; charset=utf-8",
                     success: function(msg) {
                         //HANDLING JSON FROM BACKEND
                         var stringifiedMsg = JSON.stringify(msg);
                         var parsedMsg = JSON.parse(stringifiedMsg); //GOOD WAY OF DOING IT
                         //HANDLING JSON FROM BACKEND
                         if (parsedMsg.message) {
                            successMsg(parsedMsg.message);
                            resetThumbnails();
                            resetIngredients();
                         } else if (parsedMsg.error) {
                            errorMsg(parsedMsg.error);
                         }
                         //reset field values
                         $("#name").val("");
                         $("#description").val("");
                         $("#image").val("");
                         $("#category").val(""); //To fix
                     }
                });
            }  else {
                errorMsg("Please enter a valid name!");
            }
            
         });