$(document).ready(function () {
    "use strict";
    parseRSS();
    //#region Startup Tasks

//load all locally stored settings (colour etc.)
LoadPreferences();

//populate To Do List
PopulateToDo();

    //#endregion
});

function InputBoxhandler(event){
    if (event.key === 'Enter') {

        var Input = document.getElementById("textinput");

        $.ajax({
            url: "/LandingPage/PHP-Controls/AddToDo.php",
            type: 'GET',
            data: {
                QueryValue: String(Input.value)
            },

            success: function (Data) {
                Input.value = "";
                PopulateToDo();
            }
        });
        
    }
}
function DeleteListItem(e){
    
    var TextValue = e.originalTarget.innerText;
   
    $.ajax(
        "/LandingPage/PHP-Controls/DeleteToDo.php", {
            data: {QueryValue: TextValue},
            success: function (Data) {
                PopulateToDo();
            }
    });
}
function PopulateToDo(){
    //select and clear to do list
    var ToDo = document.getElementById("ToDoList");
    ToDo.innerHTML = "";

    //fetch to do elements and append to list
    $.ajax(
        "/LandingPage/PHP-Controls/LoadToDo.php", {
        success: function (data) {
            var ToDoItemsJson = JSON.parse(data);

            for(var x = 0; x <ToDoItemsJson.length;x++){
                console.log(ToDoItemsJson[x]);
                var ListElement = document.createElement("li");
                ListElement.textContent = ToDoItemsJson[x].ToDoContent;
                ToDo.appendChild(ListElement);
            }

        }
    });
  
    
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
function parseRSS() {
    $.ajax({
      url: '/LandingPage/PHP-Controls/FetchRss.php',

      success: function(data) {
        var XMLcontent = data.children[0].children[0].children;

        for(var x = 8; x<20;x++){
            XMLarticle = XMLcontent[x];
            console.log(XMLarticle);

            var ArticleBody = document.createElement("div");
            var Text = XMLarticle.textContent;
            try {
                Text = Text.split("<li>")[1];
                Text = Text.split("<li>")[0];
            } catch (error) {
                console.log("Article Incorrect Format");
                Text="";
            }
            
            console.log(Text);
            ArticleBody.innerHTML = Text;

           

            var googlefeed = document.getElementById("GoogleFeed");
            googlefeed.appendChild(ArticleBody);
        }
      }

    });
  }