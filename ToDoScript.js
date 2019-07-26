$(document).ready(function () {
    $("#submit").submit(function (event) {
        var Content = document.getElementById(ToDoInput).innerText;
        alert(Content);

    });
})
$.ajaxSetup({
    cache: false
});