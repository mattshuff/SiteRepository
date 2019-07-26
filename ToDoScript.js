$(document).ready(function () {
    console.log("test");

    document.getElementById("textinput").addEventListener("keypress",function(){
        alert(document.getElementById("textinput").value);
    }
    )
})
