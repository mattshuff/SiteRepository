$(document).ready(function () {
    console.log("test");

})
$(function() {
    $('myform').submit(function() {
        alert("test");
        $.ajax({
            type: 'POST',
            url: 'submit.php',
            data: { username: $(this).name.value, 
                    password: $(this).password.value }
        });
        return false;
    }); 
})

function test(){
    var Content = document.getElementById("ToDoInput").value;
    var x = document.getElementById("ToDoList");

    $.ajax({
        url: "AddToDo.php",
        type: 'GET',
        data: {
            QueryValue: String(Content),
        },
        success: function (Data) {
            alert("success");
        }
    })
}

            


