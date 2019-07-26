$(document).ready(function () {
    //populate to do 
    $.ajax(
        'LoadToDo.php',
        {
          success: function (data) {
    
            var DataArray = data.split("*");

            for (var x = 0; x < DataArray.length; x++) {
    
              var ul = document.getElementById("ToDoList");
              var li = document.createElement("li");
              li.appendChild(document.createTextNode(DataArray[x]));
            }
        }
    })

    //add submit event listener to text input box
    var Input = document.getElementById("textinput");
    Input.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            alert("success");

            $.ajax({
                url: "AddToDo.php",
                type: 'GET',
                data: {
                    QueryValue: String(Input.value)
                },

                success: function (Data) {},               
            })
        }
    })
})