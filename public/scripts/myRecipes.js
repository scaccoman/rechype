/* global $ */
/* global successMsg errorMsg */

$("#myReceiptsNav").addClass("active");

/**
 * Listen to scroll to change header opacity class
 */
function checkScroll(){
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if($(window).scrollTop() > startY){
        $('.navbar').removeClass("scrolled");
    }else{
        $('.navbar').addClass("scrolled");
    }
}

if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

if ($(window).width() < 500) {
    $(".container-fluid>.navbar-collapse, .container-fluid>.navbar-header, .container>.navbar-collapse, .container>.navbar-header").css("background-color", "rgba(34, 34, 34, 0.70)");
    $("#searchBox").css("width", "100%");
}
/**
 * END: Listen to scroll to change header opacity class
 */

//GET RECEIPTS LIST
        function pageInit(){
            $.ajax({url: "/personalData", 
                    dataType: 'json',
                    processData: false, 
                    success: function(data){
                        var parsedData = JSON.parse(data);
                        if (parsedData.error) {
                            errorMsg(parsedData.error);
                        } else {
                            // console.log("data successfully received");
                            // console.log(parsedData[0]);
                            if (typeof parsedData === Object) {
                                parsedData = [parsedData];
                            }
                            parsedData.forEach(function(receipt){
                                var ingredientsHtmlStr = "";
                                if (receipt.image === ""){
                                    receipt.image = "http://worldseriesdreaming.com/wp-content/uploads/2014/08/blog12.jpg";
                                }
                                if (receipt.ingredients.length > 1 && receipt.ingredients.length <= 5){
                                    receipt.ingredients.forEach(function(ingredient){
                                            ingredientsHtmlStr += "<li>" + ingredient + "</li>";
                                    });
                                } else if (receipt.ingredients.length > 5) {
                                    for (let i = 0; i < 5; i++){
                                        ingredientsHtmlStr += "<li>" + receipt.ingredients[i] + "</li>";
                                    }
                                } else {
                                    ingredientsHtmlStr = receipt.ingredients;
                                }
                                var htmlStr = "<div class='col-sm-6 col-md-4 remove'>" +
                                                "<div class='thumbnail'>" +
                                                  "<img src='" + receipt.image + "' alt='receipt photo'>" +
                                                    "<div class='caption'>" +
                                                      "<h3>" + receipt.name + "</h3>" + 
                                                         "<p>" + receipt.description.substring(0,100) + "...</p>" +
                                                         "<h4>Ingredients:</h4>" + 
                                                         "<ul>" + ingredientsHtmlStr + "</ul>" +
                                                        "<p><a href='/receipts/" + receipt._id + "' class='btn btn-primary' role='button'>More Info</a>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                            $("#thumbnails").append(htmlStr);
                            });
                        }
            }});
        }
        
        pageInit();
        
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
            ingredientCounter = 0;
        }
        
        function resetPopupHeight(){
            $("#popup").css("height", "350px");
        }
        
        var ingredientCounter = 0;
        
        $("#newIngredient").click(function() {
            // $("#ingredientsSpacer").prepend("<button class='form-control btn btn-danger' id='newIngredient'><span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span></button>");
            //TO DO: ADD REMOVE INGREDIENT BUTTON
            //ADD SPACE FOR NEW INPUT FIELDS
            if (ingredientCounter < 4){
                var currentHeight = $("#popup").css("height");
                var currentHeightNum = Number(currentHeight.slice(0, -2));
                var newHeight = (currentHeightNum + 38).toString();
                $("#popup").css("height", newHeight + "px");
                $("#ingredientsSpacer").append("<li class='resetIngredients'><input type='text' class='form-control ingredients inputSpacing' style='-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;' placeholder='Ingredient'></li>");
            }
            ingredientCounter++;
        });
        
        //ADD RECEIPT BUTTON
         $("#newReceipt").click(function(){
            var receiptData = {};
            receiptData.name = $("#name").val();
            receiptData.description = $("#description").val();
            receiptData.image = $("#image").val();
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
                            //  $("#message").html(parsedMsg.message);
                            //  $("#message").removeClass();
                            //  $("#message").addClass("alert alert-success");
                            successMsg(parsedMsg.message);
                            resetThumbnails();
                            resetIngredients();
                            pageInit();
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
         
        //HIDE-SHOW popup window
        
        $("#thumbnailContainer").click(function() {
            show();
        });
        
        $("#closeBtn").click(function() {
            hide();
            $("#message").removeClass();
            $("#message").empty();
            resetIngredients();
            resetPopupHeight();
        });
        
        function show(){
            $("#popup").css("display", "block");
        }
        
        function hide(){
            $("#popup").css("display", "none");
        }
        
        //END POPUP WINDOW CODE