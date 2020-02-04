<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

foreach($_GET as $value){
    echo $value;
}
$StockName = $_GET['StockNamePost'];
$StockTicker = $_GET['StockTickerPost'];

$insert = "INSERT INTO `Stocks`(`StockNickName`, `StockTicker`)";
$values = "VALUES ('".$StockName."','".$StockTicker."')";
$sql = $insert.$values;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>". "<br>". "<br>" . mysqli_error($connect);
}
?>