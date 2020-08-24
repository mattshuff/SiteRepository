<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$myArray = array();
$SQL = "SELECT DISTINCT `RecipeCategory` FROM `Recipes` WHERE 1";
$result = mysqli_query($connect, $SQL);
while($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $myArray[] = $row;
}
echo json_encode($myArray);