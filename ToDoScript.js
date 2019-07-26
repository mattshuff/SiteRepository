$(document).ready(function () {
    console.log("test");

    $("#submit").submit(function( event ) {

        console.log("ayaya");

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
    })
})

