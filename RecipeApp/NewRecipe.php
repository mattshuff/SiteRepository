<?php
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//INSERT INTO `recipes`(`RecipeName`, `RecipeIngredients`, `RecipeNotes`) VALUES ([value-2],[value-3],[value-4])

$RecipeName = $_GET['RecipeName'];
$RecipeIngredients = $_GET['RecipeIngredients'];
$RecipeMethod = $_GET['RecipeMethod'];


$sql = "INSERT INTO `recipes`(`RecipeName`, `RecipeIngredients`, `RecipeNotes`) VALUES ("
$sql = $sql.$RecipeName.",".$RecipeIngredients.",".$RecipeMethod.")";
echo $sql;


//if (mysqli_query($connect, $sql)) {
//    echo "New record created successfully";
//} else {
//    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
//}
?>