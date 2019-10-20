<?php

//setup connection to database *works*
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//fetch current index  *works*
$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$CurrentIndex = $Result->fetch_row();
echo $CurrentIndex[0];

//fetch all tracked tickers ****NOT QUITE RIGHT****
$sql = "SELECT `StockTicker` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$rows = [];

while($row = mysqli_fetch_assoc($Result)) {
    $rows[] = $row;
}
foreach($rows as $current){
    echo $current;
}
//fetch daily 
$func = "TIME_SERIES_DAILY_ADJUSTED";
$symbol = $Records[$CurrentIndex]; //DONT THINK THIS WORKS 
$APIurl = "https://www.alphavantage.co/query?function="+$func+"&symbol="+$symbol+"&apikey=DET6IF6YAHK5PGVO";
?>