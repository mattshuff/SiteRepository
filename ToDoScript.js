$(document).ready(function () {
    $("#submit").submit(function (event) {
        var Content = document.getElementById("ToDoInput").innerText;
        console.log("hehe");
        alert(Content);

    });
})
$.ajaxSetup({
    cache: false
});