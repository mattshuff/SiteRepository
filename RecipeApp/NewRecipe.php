<?php
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$RecipeName = $_GET['RecipeName'];
$RecipeIngredients = $_GET['RecipeIngredients'];
$RecipeMethod = $_GET['RecipeMethod'];
echo $RecipeMethod;
$sql = "INSERT INTO `recipes`(`RecipeName`, `RecipeIngredients`, `RecipeNotes`) VALUES ("
$sql = $sql.$RecipeName.",".$RecipeIngredients.",".$RecipeMethod.")";
echo $sql;


//if (mysqli_query($connect, $sql)) {
//    echo "New record created successfully";
//} else {
//    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
//}
?>