<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$RecipeName = $_GET['RecipeName'];
$RecipeIngredients = $_GET['RecipeIngredients'];
$RecipeMethod = $_GET['RecipeMethod'];

$sql = "INSERT INTO `recipes`(`RecipeName`, `RecipeIngredients`, `RecipeNotes`) VALUES (".$RecipeName.",".$RecipeIngredients.",".$RecipeMethod.")";



if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>". "<br>". "<br>" . mysqli_error($connect);
}
?>