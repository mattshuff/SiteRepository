<?php

//setup connection to database *works*
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//fetch current index *works*
$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$CurrentIndex = $Result->fetch_row();

//fetch all tickers from DB *works*
$sql = "SELECT `StockTicker` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);

//convert DB query result to numeric array *works*
$Tickers = $Result->fetch_all(MYSQLI_NUM); //can be accessed via index

for ($x = 0; $x <= 2; $x++) {
    echo $Tickers[$x][0];
} 

//fetch daily 
$func = "TIME_SERIES_DAILY_ADJUSTED";
$symbol = $Tickers[$CurrentIndex[0]]; 
//echo $symbol;
//$APIurl = "https://www.alphavantage.co/query?function=".$func."&symbol=".$symbol."&apikey=DET6IF6YAHK5PGVO";
?>