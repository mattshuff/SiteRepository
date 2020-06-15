<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT * FROM `ToDo`";

$result = mysqli_query($connect, $sql);

$dbdata = array();

while ( $row = $result->fetch_assoc())  {
	$dbdata[]=$row;
  }

echo json_encode($dbdata);
