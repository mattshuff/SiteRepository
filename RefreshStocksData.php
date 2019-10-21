<?php

//setup connection to database *works*
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//fetch current index 
$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$CurrentIndex = $Result->fetch_row();

//fetch all tracked tickers
$sql = "SELECT `StockTicker` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$Tickers = $Result->fetch_array(MYSQLI_NUM); //can be accessed via index
foreach($Result as $Test){
    echo (string)$Test[0];
}

//fetch daily 
$func = "TIME_SERIES_DAILY_ADJUSTED";
$symbol = $Tickers[$CurrentIndex[0]]; 
echo $symbol;
$APIurl = "https://www.alphavantage.co/query?function=".$func."&symbol=".$symbol."&apikey=DET6IF6YAHK5PGVO";
?>