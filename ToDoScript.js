$(document).ready(function () {
    //populate to do 
    $.ajax(
        'LoadToDo.php',
        {
          success: function (data) {
    
            var DataArray = data.split("*");
            var ul = document.getElementById("ToDoList");

            for (var x = 0; x < DataArray.length; x++) {
              
              var li = document.createElement("li");
              li.appendChild(document.createTextNode(DataArray[x]));

              li.onclick = function () {
                    var HoverValue = this.innerHTML;

                    $.ajax({
                        url: 'DeleteToDo.php',
                        type: 'GET',
                        data: {
                            QueryValue: String(HoverValue)
                        },
                    })
                    $(this).remove();
                }

              ul.appendChild(li);
            }
        }
    })

    //add submit event listener to text input box
    var Input = document.getElementById("textinput");
    Input.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            
            var ul = document.getElementById("ToDoList");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(Input.value));
            ul.appendChild(li);

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