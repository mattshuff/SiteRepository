$(document).ready(function () {
    "use strict";

    //#region Startup Tasks

    //load all locally stored settings (colour etc.)
    LoadPreferences();

    //populate To Do List
    PopulateToDo();

    //fill news section
    PopulateNews();
    
    //apply current weather to box
    GetWeather();



    //#endregion
});

function InputBoxhandler(event) {
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
function DeleteListItem(e) {

    var TextValue = e.originalTarget.innerText;

    $.ajax(
        "/PHP-Controls/DeleteToDo.php", {
        data: { QueryValue: TextValue },
        success: function (Data) {
            PopulateToDo();
        }
    });
}
function PopulateToDo() {
    //select and clear to do list
    var ToDo = document.getElementById("ToDoList");
    ToDo.innerHTML = "";

    //fetch to do elements and append to list
    $.ajax(
        "/LandingPage/PHP-Controls/LoadToDo.php", {
        success: function (data) {
            var ToDoItemsJson = JSON.parse(data);

            for (var x = 0; x < ToDoItemsJson.length; x++) {
                var ListElement = document.createElement("li");
                ListElement.textContent = ToDoItemsJson[x].ToDoContent;
                ToDo.appendChild(ListElement);
            }

        }
    });


}
function SwapColourMode(e) {
    console.log(e);
    var SenderImageID = "";
     try {
         //firefox compatiable
        SenderImageID=e.originalTarget.id;
    } catch (error) {
        //chrome comptaiable
        SenderImageID=e.path[0].id;
    }
    
    

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
        Image.src = "/Landingpage/Assets/sun.png";
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
        Image.src = "/Landingpage/Assets/moon.png";
        Image.id = "MoonIMG";

        body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else if (ColourMode == "dark") {

        Image = document.getElementById("SunIMG");
        Image.src = "/Landingpage/Assets/sun.png";
        Image.id = "SunIMG";

        body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";
    }
}
function parseRSS() {
    $.ajax({
        url: 'PHP-Controls/FetchRss.php',
        async: true,
        success: function (data) {
            var XMLStrings = data.split("\n");

            parser = new DOMParser();
            var BusinessXML;
            BusinessXML = parser.parseFromString(XMLStrings[0], "text/xml");
            var TopicArticles = BusinessXML.children[0].children[0].children;
            var XMLarticle;
            var Text;
            var x;

            //try to construct and append 8 buisiness articles
            for (x = 8; x < 18; x++) {
                XMLarticle = TopicArticles[x];


                var BuisinessBody = document.createElement("div");
                Text = XMLarticle.textContent;
                try {
                    Text = Text.split("<li>")[1];
                    Text = Text.split("<li>")[0];
                } catch (error) {
                    console.log("Article Incorrect Format");
                    Text = "";
                }

                BuisinessBody.innerHTML = Text;
                BuisinessBody.style.paddingBottom = "5px";
                BuisinessBody.style.fontSize = "17px";


                var googlefeed = document.getElementById("GoogleFeed");
                googlefeed.appendChild(BuisinessBody);
            }

            var TechXML;
            TechXML = parser.parseFromString(XMLStrings[1], "text/xml");
            TopicArticles = TechXML.children[0].children[0].children;
            for (x = 8; x < 12; x++) {
                XMLarticle = TopicArticles[x];


                TechBody = document.createElement("div");
                Text = XMLarticle.textContent;
                try {
                    Text = Text.split("<li>")[1];
                    Text = Text.split("<li>")[0];
                } catch (error) {
                    console.log("Article Incorrect Format");
                    Text = "";
                }

                TechBody.innerHTML = Text;
                TechBody.style.paddingBottom = "5px";
                TechBody.style.fontSize = "17px";


                var TechFeed = document.getElementById("TechFeed");
                TechFeed.appendChild(TechBody);
            }

            var PoliticsXML;
            PoliticsXML = parser.parseFromString(XMLStrings[2], "text/xml");
            TopicArticles = PoliticsXML.children[0].children[0].children;

            for (x = 8; x < 13; x++) {
                XMLarticle = TopicArticles[x].children[4];

                var PoliticsBody = document.createElement("div");
                Text = XMLarticle.textContent;

                PoliticsBody.innerHTML = Text;
                PoliticsBody.style.paddingBottom = "5px";
                PoliticsBody.style.fontSize = "17px";


                var PoliticsFeed = document.getElementById("PoliticsFeed");
                PoliticsFeed.appendChild(PoliticsBody);
            }
        }

    });
}
function PopulateNews() {

    var JsonStrings;
    $.ajax({
        type: "GET",
        url: '/LandingPage/PHP-Controls/FetchAllFromNews.php',
        async: false,


    }).done(function (data) {
        var DataLines = data.split("\n");

        var BuisnessJSON = JSON.parse(DataLines[0]);
        BuisnessArticles(BuisnessJSON);

        var TechJSON = JSON.parse(DataLines[1]);
        TechArticles(TechJSON);

        var TimesJSON = JSON.parse(DataLines[2]);
        TimesArticles(TimesJSON);
    });

    var x;
    var CurrentArticle;
    var ArticleText;

    function BuisnessArticles(BuisnessJSON) {

        BuisnessJSON = BuisnessJSON.channel.item;
        console.log(BuisnessJSON);
        //construct B articles
        for (x = 0; x < 8; x++) {

            var BuisinessBody = document.createElement("div");

            CurrentArticle = BuisnessJSON[x];
            ArticleText = CurrentArticle.description;

            try {
                ArticleText = ArticleText.split("<li>")[1];
                
                if(ArticleText==undefined){ArticleText="";}

            } catch (error) {
                console.log("ERROR CAUGHT");
            }

            BuisinessBody.innerHTML = ArticleText;
            BuisinessBody.style.paddingBottom = "5px";
            BuisinessBody.style.fontSize = "17px";


            var googlefeed = document.getElementById("GoogleFeed");
            googlefeed.appendChild(BuisinessBody);
        }
    }
    function TechArticles(TechJSON) {
        TechJSON = TechJSON.channel.item;
        console.log(TechJSON);
        //construct tech articles
        for (x = 0; x < 4; x++) {

            CurrentArticle = TechJSON[x];

            var TechBody = document.createElement("div");

            ArticleText = CurrentArticle.description;
            try {
                ArticleText = ArticleText.split("<li>")[1];
                
                if(ArticleText==undefined){ArticleText="";}

            } catch (error) {
                console.log("ERROR CAUGHT");
            }

            TechBody.innerHTML = ArticleText;
            TechBody.style.paddingBottom = "5px";
            TechBody.style.fontSize = "17px";


            var TechFeed = document.getElementById("TechFeed");
            TechFeed.appendChild(TechBody);
        }
    }
    function TimesArticles(TimesJSON) {
        
        TimesJSON = TimesJSON.channel.item;
        console.log(TimesJSON);
        //construct times articles 
        for (x = 0; x < 5; x++) {
            CurrentArticle = TimesJSON[x].description;


            var PoliticsBody = document.createElement("div");
            ArticleText = CurrentArticle;
            try {
                ArticleText = ArticleText.split("<li>")[0];
            } catch (error) {
                ArticleText="";
            }
            if(ArticleText=="undefined"){ArticleText="";}
            PoliticsBody.innerHTML = ArticleText;
            PoliticsBody.style.paddingBottom = "5px";
            PoliticsBody.style.fontSize = "17px";


            var PoliticsFeed = document.getElementById("PoliticsFeed");
            PoliticsFeed.appendChild(PoliticsBody);
        }
    }
    //functions to build each section so we can wait for ajax request to resolve


}
//filter: grayscale(100%);
function GetWeather(){
    //call to api, daily -weather - description "heavy rain"
    //shade appropriate weather icon
       
    //humidity bar, move element realtive to percentage 

    //feels like 

    //scroll thgrough locations 
}
function LocationButtonClick(){
    //get index of button that was clicked and swap to relevant page of weather info 
}