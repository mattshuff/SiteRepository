$(document).ready(function () {
    console.log("test");
    var Input = document.getElementById("textinput");
    Input.addEventListener("keydown", function (event) {
        if (event.key = 13) {
            alert("success");

            $.ajax({
                url: "AddToDo.php",
                type: 'GET',
                data: {
                    QueryValue: String(Input.value)
                },

                success: function (Data) {

                },
            })
        }
    })
})