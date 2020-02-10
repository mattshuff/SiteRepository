<?php

$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$StockNamePost = $_GET['StockNamePost'];


$delete = "DELETE FROM `Stocks` WHERE";
$where = "`StockNickName` = '$StockNamePost' ;";
$sql = $delete.$where;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error:        " . $sql . "                        " . mysqli_error($connect);


   
}
?>