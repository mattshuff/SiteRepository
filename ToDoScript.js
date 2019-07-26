$(document).ready(function () {
    console.log("test");

    $('#submit').keydown(function() {
        var key = e.which;
        if (key == 13) {

        var Content = document.getElementById("ToDoInput").value;
        var x = document.getElementById("ToDoList");

        console.log("ayaya");

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
})
})

