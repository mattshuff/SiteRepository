<?php

//create connection to database 
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//fetch all tickers from DB 
$sql = "SELECT `StockTicker` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);
$Tickers = $Result->fetch_all(MYSQLI_NUM);

$func = "TIME_SERIES_DAILY_ADJUSTED";

for ($x = 0; $x <= 1; $x++) {
    //fetch current index 
    $sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
    $Result = mysqli_query($connect, $sql);
    $CurrentIndex = $Result->fetch_row();

    //construct API call
    $CurrentTicker = $Tickers[$CurrentIndex[0]][0];
    $APIurl = "https://www.alphavantage.co/query?function=" . $func . "&symbol=" . $CurrentTicker . "&apikey=DET6IF6YAHK5PGVO";

    $JSONstring = file_get_contents($APIurl);
    $JSONarray = json_decode($JSONstring, true);
    echo $JSONarray[0][0];

    //SETUP FOR NEXT LOOP!
    //get number of records 
    $sql = "select COUNT(*) from Stocks";
    $Result = mysqli_query($connect, $sql);
    $temp = $Result->fetch_row();
    $RecordsCount = $temp[0];

    //if we are not at the end of the records do this
    if ($RecordsCount > $CurrentIndex[0]) {
        echo "if";
        $CurrentIndex[0]++;
        $sql = "UPDATE `Stocks` SET `CurrentIndex`=" . (string) $CurrentIndex[0] . " WHERE 1";
        $Result = mysqli_query($connect, $sql);
    }
    //if we are at the final record, go back to zero 
    else {
        echo "else";
        $CurrentIndex[0] = 0;
        $sql = "UPDATE `Stocks` SET `CurrentIndex`=" . (string) $CurrentIndex[0] . " WHERE 1";
        $Result = mysqli_query($connect, $sql);
    }
}
