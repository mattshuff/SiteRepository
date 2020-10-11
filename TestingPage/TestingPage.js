$(document).ready(function () {

});



function TestPHP() {
    $.ajax({
        type: "POST",
        url: 'Test.py',
        data: "",
        async: false,
        success: function (data) //on recieve of reply
        {
            console.log(data);
        }
    });

}