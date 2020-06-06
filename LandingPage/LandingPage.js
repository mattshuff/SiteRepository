$(document).ready(function () {

    //populate to do 
    $.ajax(
        "LandingPage/LoadToDo.php", {
        success: function (data) {

            //split data into array
            var DataArray = data.split("*");

            //select empty list
            var ul = document.getElementById("ToDoList");

            //loop through data 
            for (var x = 0; x < DataArray.length; x++) {

                //create a list element and append to larger structure 
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(DataArray[x]));

                //give double click function to remove it 
                li.ondblclick = function () {
                    var HoverValue = this.innerHTML;

                    $.ajax({
                        url: 'LandingPage/DeleteToDo.php',
                        type: 'GET',
                        data: {
                            QueryValue: String(HoverValue)
                        },
                    });
                    $(this).remove();
                };

                ul.appendChild(li);
            }
        }
    });


    //add submit event listener to text input box
    var Input = document.getElementById("textinput");
    Input.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {

            //select list 
            var ul = document.getElementById("ToDoList");

            //create new list element 
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(Input.value));

            li.ondblclick = function () {
                var HoverValue = this.innerHTML;

                $.ajax({
                    url: 'LandingPage/DeleteToDo.php',
                    type: 'GET',
                    data: {
                        QueryValue: String(HoverValue)
                    },
                });
                $(this).remove();
            };

            ul.appendChild(li);

            $.ajax({
                url: "LandingPage/AddToDo.php",
                type: 'GET',
                data: {
                    QueryValue: String(Input.value)
                },

                success: function (Data) {
                    Input.value = "";
                }
            });
        }
    });

    LoadPreferences();
});
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
    if (ColourMode == "light") {

        var Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/moon.png";
        Image.id = "MoonIMG";

        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else if (ColourMode == "dark") {

        var Image = document.getElementById("MoonIMG");
        Image.src = "/LandingPage/Assets/sun.png";
        Image.id = "SunIMG";

        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";


    }
}
function LoadPreferences() {
    var ColourMode = localStorage.ColourMode;
    if (ColourMode == "light") {

        var Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/moon.png";
        Image.id = "MoonIMG";

        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else if (ColourMode == "dark") {

        var Image = document.getElementById("SunIMG");
        Image.src = "/LandingPage/Assets/Sun.png";
        Image.id = "SunIMG";

        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";


    }
}