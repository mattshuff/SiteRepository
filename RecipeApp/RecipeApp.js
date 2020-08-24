$(document).ready(function () {

    //eventually need to be able to write categories in by hand 
var x = document.getElementById("RecipeCategory");
var y = document.createElement("option");
y.text = "main";
x.appendChild(y);


//Fill Categories Selection
var CategoriesDiv = document.getElementById("Categories");
$.ajax({
    type: "GET",
    url: '/RecipeApp/PHP/GetCategories.php',
    async: false,
    dataType: 'html',
    success: function (data) //on recieve of reply
    {
        var Data = JSON.parse(data);
        var count = Object.keys(Data).length;
        for(var i = 0; i < count;i++){
            var Category = Data[i]["RecipeCategory"];
            
            var CategoryNode = document.createElement("p");
            CategoryNode.innerText = Category;
            CategoryNode.onclick = CategoryPClick;

            CategoriesDiv.appendChild(CategoryNode);

            
            
        }    
    }
});


//Fetch all existing recipes and convert into json 
var JSONstring;
$.ajax({
    type: "GET",
    url: '/RecipeApp/PHP/FetchAll.php',
    async: false,
    dataType: 'html',
    success: function (data) //on recieve of reply
    {
        JSONstring = data;       
    }
});
var JSONobject = JSON.parse(JSONstring);


//iterate over each recipe
var count = Object.keys(JSONobject).length;
for(var i = 0; i < count;i++){
    console.log(JSONobject[i]);
}


});





//when user clicks a category, this function fires to show the relevant recipies.
function CategoryPClick(event){
    console.log(event);
    var ClickedText = event.originalTarget.textContent;

}

function div_show() {
    document.getElementById('popupform').style.display = "block";
}
function div_hide() {
    document.getElementById('popupform').style.display = "none";
}