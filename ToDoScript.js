$(document).ready(function () {
    $("#submit").submit(function (event) {
        var Content = document.getElementById("ToDoInput").value;
        var x = document.getElementById("ToDoList");

        $.ajax({
            url: "AddToDo.php",
            type: 'GET',
            data: {
                QueryValue: String(Content),
            },
            success: function (Data) {

            },
        })
    })
})