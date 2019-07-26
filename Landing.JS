//JS to run on startup
$(document).ready(function () {
	$("#submit").submit(function (event) {
		var Content = document.getElementById(ToDoInput).innerText;
		alert(Content);

	});
})
$.ajaxSetup({
	// Disable caching of AJAX responses
	cache: false
});