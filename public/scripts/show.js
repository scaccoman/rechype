/* global $ */
/* global successMsg errorMsg */

$("#homeNav").addClass("active");
        
        //DELETE RECEIPT BUTTON
         $("button.btn.btn-danger").click(function(){
            var receiptId = $('input[type=hidden]').val();
            var url = "/receipts/" + receiptId;
                $.ajax({
                    url: url,
                    type: 'DELETE',
                    data: {},
                    contentType:'application/json',
                    dataType: 'text',
                    success: function(result) {
                        successMsg("Receipt correctly deleted, you will now be redirected to the home page");
                        setTimeout(function(){
                            window.location.replace("/home");
                        }, 3000);
                    },
                    error: function(result){
                        errorMsg("Error while deleting your receipt, please try again");
                    }
                });
            
         });