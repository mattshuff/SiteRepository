<?php

$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$CurrentIndex = mysqli_query($connect, $sql);
echo $CurrentIndex;

$sql = "SELECT * FROM 'stocks'";
$Records = mysqli_query($connect, $sql);
echo $Records;


$FiveDayData = file_get_contents("");
$FiveMonthData = file_get_contents("");

$func = "TIME_SERIES_DAILY_ADJUSTED";
$symbol; //fetch this from the database 
$APIurl = "https://www.alphavantage.co/query?function="+$func+"&symbol="+$symbol+"&apikey=DET6IF6YAHK5PGVO";

mysqli_query($connect, $sql);
?>