//JS to run on startup
$(document).ready(function(){ 
ReloadToDo();
}) 
$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

//refresh ToDo list from file
function ReloadToDo(){
  $.get("ToDoItems.txt",function(data) {
    var x = data.split(/\n/)   
    var arrayLength = x.length;
    for (var i = 0; i < arrayLength; i++) {
		AppendToList(x[i]);
		
		//function to append to ToDo list 
		function AppendToList(listText) {
			//construct LI
			var node = document.createElement("LI");
			var textnode = document.createTextNode(listText);
			node.appendChild(textnode);

			//give onclick events 
			node.onclick = function () {
				var ToDelete = this.innerHTML;
				$.post('RemoveTask.php', {StringValue:ToDelete});
				this.remove();
			}
			//submit 
			document.getElementById("ToDoList").appendChild(node);
		}
}
 });
}