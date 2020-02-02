$(document).ready(function () {
    //populate to do 
    $.ajax(
        "LandingPage/LoadToDo.php", {
            success: function (data) {

                //split data into array
                var DataArray = data.split("*");

                //select empty list
                var ul = document.getElementById("ToDoList");

                //loop through data 
                for (var x = 0; x < DataArray.length; x++) {

                    //create a list element and append to larger structure 
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(DataArray[x]));

                    //give double click function to remove it 
                    li.ondblclick = function () {
                        var HoverValue = this.innerHTML;

                        $.ajax({
                            url: 'LandingPage/DeleteToDo.php',
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

            //select list 
            var ul = document.getElementById("ToDoList");

            //create new list element 
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(Input.value));

            li.ondblclick = function () {
                var HoverValue = this.innerHTML;

                $.ajax({
                    url: 'LandingPage/DeleteToDo.php',
                    type: 'GET',
                    data: {
                        QueryValue: String(HoverValue)
                    },
                })
                $(this).remove();
            }

            ul.appendChild(li);

            $.ajax({
                url: "LandingPage/AddToDo.php",
                type: 'GET',
                data: {
                    QueryValue: String(Input.value)
                },

                success: function (Data) {
                    Input.value = "";
                }
            })
        }
    })
})