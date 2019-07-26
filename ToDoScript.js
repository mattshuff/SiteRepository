$(document).ready(function () {
    $("#submit").submit(function (event) {
        var Content = document.getElementById("ToDoInput").value;
        console.log("hehe");
        alert(Content);

    });
})
$.ajaxSetup({
    cache: false
});