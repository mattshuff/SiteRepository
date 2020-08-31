$(document).ready(function () {

    LoadPreferences();

//Fill Categories Form section
var CategoriesDiv = document.getElementById("Categories");
var CategorySelect = document.getElementById("RecipeCategory");

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
            var BRelement = document.createElement("br");
            CategoriesDiv.appendChild(BRelement);
            

            //also add the options to the form
            var Option = document.createElement("option");
            Option.textContent = Category;
            CategorySelect.appendChild(Option);
            
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

    var ClickedText = event.originalTarget.textContent;
    var RecipeJSON = GetRecipes();

    var RecipesDiv = document.getElementById("SubRecipes");
    RecipesDiv.innerHTML="";
    //iterate through all recipies, only fetching text so should bve fine to just filter them here rather than in SQL
    for(var i = 0; i < Object.keys(RecipeJSON).length; i++){


        //if the category is correct
        if(RecipeJSON[i].RecipeCategory == ClickedText && RecipeJSON[i].RecipeName !=""){
            var RecipeWrapper = document.createElement("div");

            var DeleteButton = document.createElement("p");
            DeleteButton.innerText="X  ";
            DeleteButton.style="display: inline; cursor:pointer; color:antiquewhite";
            DeleteButton.onclick = DeleteRecipe;
            RecipeWrapper.appendChild(DeleteButton);


            var RecipeNode = document.createElement("p");
            RecipeNode.setAttribute("class","NodeP");
            RecipeNode.innerText = RecipeJSON[i].RecipeName;
            RecipeNode.onclick = FetchImages;
            RecipeWrapper.appendChild(RecipeNode);


                RecipesDiv.appendChild(RecipeWrapper); 
        }
    }
}

function DeleteRecipe(event){

var CurrentColour = this.style.color;

if(CurrentColour!="red"){
this.style = "display: inline; cursor:pointer; color:red";
}
else{
    var RecipeName = event.originalTarget.nextElementSibling.textContent;
  
    $.ajax({
        type: "GET",
        url: '/RecipeApp/PHP/DeleteRecipe.php',
        async: false,
        dataType: 'html',
        data: {RecipeName: RecipeName},
        success: function (data) //on recieve of reply
        {
                console.log(data);
                location.reload();
            }    
        });
}
}

function FetchImages(event){

//images are stored in a public folder, so we can assemble a url to access them by the recipe name 
var RecipeName = event.originalTarget.innerText;
var BaseUrl = window.location.href;
BaseUrl = BaseUrl.slice(0,-14);

//construct urls, this code assumes everything is a jpg, need to update php to reflect this 
var IngredientsImageURL = BaseUrl + "Images/" + RecipeName + "IngredientsImage.JPG";
var MethodImageURL = BaseUrl + "Images/" + RecipeName + "MethodImage.JPG";

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
function LoadPreferences() {
    var ColourMode = localStorage.ColourMode;
    var Image;
    var body = document.getElementsByTagName('body')[0];
    if (ColourMode == "light") {

        Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/moon.png";
        Image.id = "MoonIMG";

        body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else if (ColourMode == "dark") {

        Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/Sun.png";
        Image.id = "SunIMG";

        body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";
    }
}
function SwapColourMode(e) {
    var SenderImageID = e.originalTarget.id;

    if (SenderImageID == "SunIMG") {
        //change to light mode
        localStorage.ColourMode = "light";

        ApplyTheme();
    }
    else if (SenderImageID == "MoonIMG") {
        //change to dark mode 
        localStorage.ColourMode = "dark";

        ApplyTheme();

    }
}
function ApplyTheme() {
    var ColourMode = localStorage.ColourMode;
    var Image;
    var body = document.getElementsByTagName('body')[0];
    if (ColourMode == "light") {

        Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/moon.png";
        Image.id = "MoonIMG";

        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else if (ColourMode == "dark") {

        Image = document.getElementById("MoonIMG");
        Image.src = "/LandingPage/Assets/sun.png";
        Image.id = "SunIMG";

        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";
    }
}