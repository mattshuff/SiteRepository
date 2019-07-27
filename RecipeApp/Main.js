// Disable caching of AJAX responses
$.ajaxSetup({
  cache: false
});

//general functions
function div_show() {
  document.getElementById('popupform').style.display = "block";
}
//Function to Hide Popup
function div_hide() {
  document.getElementById('popupform').style.display = "none";
}

//run on startup
$(document).ready(function () {

  //input popup stuff
  var AddNewRecipeButton = document.getElementById("AddNew");
  AddNewRecipeButton.addEventListener('click', function () {
    div_show();
  })
var PopUpSubmitButton = document.getElementById("RecipeInputSubmit");
PopUpSubmitButton.addEventListener('click',function(){

  //get values
  var RecipeName = document.getElementById("RecipeNameInput").value;
  var RecipeIngredients = document.getElementById("RecipeIngredientsInput").value;
  var RecipeMethod = document.getElementById("RecipeMethodInput").value;

  $.ajax({
    url: "NewRecipe.php",
    type: 'GET',
    data: {
      RecipeName: String(RecipeName),
      RecipeIngredients: String(RecipeIngredients),
      RecipeMethod: String(RecipeMethod)
    },
    success: function (data) {
     div_hide();
    }
  })


})



  //populates list and then gives everything the hover function
  $.ajax(
    'IngredientSearch.php', {
      success: function (data) {

        var DataArray = data.split("*");
        for (var x = 0; x < DataArray.length; x++) {

          var ul = document.getElementById("RecipeList");
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(DataArray[x]));

          //on hover event
          li.onmouseover = function () {
            var MouseOverValue = this.innerHTML;

            $.ajax({
              url: "RecipeMouseOver.php",
              type: 'GET',
              data: {
                QueryValue: String(MouseOverValue)
              },

              success: function (Data) {
                var x = document.getElementById("IngredientsNotes");
                var y = document.getElementById("MethodNotes");
                var Lines = Data.split("*");
                x.innerHTML = Lines[0];
                y.innerHTML = Lines[1];
              }
            });
          }
          ul.appendChild(li);
        }
      },
      error: function () {
        alert('There was some error performing the AJAX call!');
      }
    })

  //live search feature:
  var input = document.getElementById('TextInput');
  input.addEventListener('keyup', function () {
    var x = document.getElementById('RecipeList');
    $(x).empty();

    $.ajax({
      url: "LiveSearchQuery.php",
      type: 'GET',
      data: {
        QueryValue: String(TextInput.value),
      },
      success: function (data) {
        var DataArray = data.split("*");
        for (var x = 0; x < DataArray.length; x++) {

          var ul = document.getElementById("RecipeList");
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(DataArray[x]));

          li.onmouseover = function () {
            var MouseOverValue = this.innerHTML;

            $.ajax({
              url: "RecipeMouseOver.php",
              type: 'GET',
              data: {
                QueryValue: String(MouseOverValue)
              },

              success: function (Data) {
                var x = document.getElementById("IngredientsNotes");

                var y = document.getElementById("MethodNotes");

                var Lines = Data.split("*");

                x.innerHTML = Lines[0];
                y.innerHTML = Lines[1];

              }
            });
          }

          ul.appendChild(li);
        }
      }
    })
  })
})