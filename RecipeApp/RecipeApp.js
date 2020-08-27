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
            var Category = Data[i].RecipeCategory;
            
            var CategoryNode = document.createElement("p");
            CategoryNode.innerText = Category;
            CategoryNode.onclick = CategoryPClick;
            CategoryNode.style = "cursor: pointer;";
            CategoryNode.setAttribute("class","NodeP");

            CategoriesDiv.appendChild(CategoryNode);

            
            
        }    
    }
});
});

function GetRecipes(){
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
    return JSONobject;
}

//when user clicks a category, this function fires to show the relevant recipies.
function CategoryPClick(event){
    console.log(event);
    var ClickedText = event.originalTarget.textContent;
    var RecipeJSON = GetRecipes();

    var RecipesDiv = document.getElementById("SubRecipes");
    for(var i = 0; i < Object.keys(RecipeJSON).length; i++){

        if(RecipeJSON[i].RecipeCategory == ClickedText){
            var RecipeNode = document.createElement("p");
            RecipeNode.setAttribute("class","NodeP");
            RecipeNode.innerText = RecipeJSON[i].RecipeName;
            RecipeNode.onclick = FetchImages;
            
                RecipesDiv.appendChild(RecipeNode); 
        }
    }
}

function FetchImages(event){

//images are stored in a public folder, so we can assemble a url to access them by the recipe name 
var RecipeName = event.originalTarget.innerText;
var BaseUrl = window.location.href;
BaseUrl = BaseUrl.slice(0,-14);

//construct urls, this code assumes everything is a jpg, need to update php to reflect this 
var IngredientsImageURL = BaseUrl + "Images/" + RecipeName + "IngredientsImage.jpg";
var MethodImageURL = BaseUrl + "Images/" + RecipeName + "MethodImage.jpg";

console.log(RecipeName);
console.log(IngredientsImageURL);


console.log(IngredientsImageURL);
console.log(MethodImageURL);
//append images to the page
var ImageBox = document.getElementById("ImageBox");

var IngredientsImageIMG = document.createElement("img");
IngredientsImageIMG.src = IngredientsImageURL;
IngredientsImageIMG.setAttribute("class","RecipeImage");
ImageBox.appendChild(IngredientsImageIMG);


var MethodImageIMG = document.createElement("img");
MethodImageIMG.src = MethodImageURL;
MethodImageIMG.setAttribute("class","RecipeImage");
ImageBox.appendChild(MethodImageIMG);
}

function div_show() {
    document.getElementById('popupform').style.display = "block";
}
function div_hide() {
    document.getElementById('popupform').style.display = "none";
}