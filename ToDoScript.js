$(document).ready(function () {
    console.log("test");

    document.getElementById("textinput").addEventListener("keyup",function(){
        alert(document.getElementById("textinput").value);
    }
    )
})
