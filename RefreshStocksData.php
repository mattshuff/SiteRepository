<?php

//create connection to database 
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//fetch current index 
$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$CurrentIndex = $Result->fetch_row();

//fetch all tickers from DB 
$sql = "SELECT `StockTicker` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);

//convert DB query result to numeric array 
$Tickers = $Result->fetch_all(MYSQLI_NUM);

$func = "TIME_SERIES_DAILY_ADJUSTED";

for ($x = 0; $x <= 1; $x++) {

    //construct API call
    $CurrentTicker = $Tickers[$CurrentIndex[0]][0];
    $APIurl = "https://www.alphavantage.co/query?function=" . $func . "&symbol=" . $CurrentTicker . "&apikey=DET6IF6YAHK5PGVO";

    //THIS NEEDS TO BE UPDATED IN THE DATABSE 
    $CurrentIndex[0]++;
}
