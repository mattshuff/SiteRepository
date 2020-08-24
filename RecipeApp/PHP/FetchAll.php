<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$myArray = array();
$SQL = "SELECT * FROM `Recipes`";
$result = mysqli_query($connect, $SQL);
while($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $myArray[] = $row;
}
echo json_encode($myArray);


