$(document).ready(function () {

});



function TestPHP() {
    $.ajax({
        type: "POST",
        url: 'Test.php',
        data: "",
        async: false,
        success: function (data) //on recieve of reply
        {
            console.log(data);
        }
    });
}
function TestPython() {
    $.ajax({
        type: "POST",
        url: 'Test.php',
        data: "",
        async: false,
        success: function (data) //on recieve of reply
        {
            console.log(data);
        }
    });
}