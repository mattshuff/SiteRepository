$(document).ready(function () {
    console.log("test");

document.getElementById("textinput").addEventListener("keyup",function(event){
    if(event.keyCode=13){
        alert("success");
    }
    $.ajax({
        url: "RecipeMouseOver.php",
        type: 'GET',
        data: {
          QueryValue: String(MouseOverValue)
        },

        success: function (Data) {
   
        }
      });
    }
    )
})
