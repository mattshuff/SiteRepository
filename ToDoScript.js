$(document).ready(function () {
    console.log("test");

})


function hold(){
    console.log("ayaya");
}

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

            


