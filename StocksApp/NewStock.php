<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//values from webpage
$StockName = $_GET['StockName'];
$StockTicker = $_GET['StockTicker'];

$sql = "SELECT `CurrentIndex` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);


$CurrentIndex = $Result->fetch_row()[0];


//insert new record and associated data into DB
$InsertInto= "INSERT INTO `Stocks`(`StockTicker`, `StockNickName`, `FiveDayData`, `FiveMonthData`, `CurrentIndex`)";
$Values = " VALUES (". "'" .$StockTicker. "' , '".$StockName ."' , '". RefreshDayValues($StockTicker,$connect). "' , '".RefreshMonthValues($StockTicker,$connect)."' , '".$CurrentIndex."');";

$sql = $InsertInto.=$Values;
//echo $sql;
$Result = mysqli_query($connect, $sql);

function RefreshDayValues($Ticker,$connect){
    //fetch data from Alpha Vantage
    $func = "TIME_SERIES_DAILY";
    $APIurl = "https://www.alphavantage.co/query?function=" . $func . "&symbol=" . $Ticker . "&apikey=DET6IF6YAHK5PGVO";
    $JSONstring = file_get_contents($APIurl);

    //decode data into Json
    $JSONarray = json_decode($JSONstring, true);
    $JSONarray = $JSONarray['Time Series (Daily)'];

    //get date keys, index 0 most recent
    $DateKeys = array_keys($JSONarray);

    $DataString = "";
    //loop over 5 records and append to data string 
    for($x = 0; $x<5;$x++){
        $DataString.= $DateKeys[$x];
        $DataString.= " ";
        $DataString.= $JSONarray[$DateKeys[$x]]["4. close"];
        $DataString.= "!";
    }

return $DataString;
}

//fetch and store new 5 month data 
function RefreshMonthValues($Ticker, $connect){
    //fetch data from Alpha Vantage
    $func = "TIME_SERIES_MONTHLY";
    $APIurl = "https://www.alphavantage.co/query?function=" . $func . "&symbol=" . $Ticker . "&apikey=DET6IF6YAHK5PGVO";
    $JSONstring = file_get_contents($APIurl);

    //decode data into Json
    $JSONarray = json_decode($JSONstring, true);
    $JSONarray = $JSONarray['Monthly Time Series'];

    //get date keys, index 0 most recent
    $DateKeys = array_keys($JSONarray);

    $DataString = "";
    //loop over 5 records and append to data string 
    for($x = 0; $x<5;$x++){
        $DataString.= $DateKeys[$x];
        $DataString.= " ";
        $DataString.= $JSONarray[$DateKeys[$x]]["4. close"];
        $DataString.= "!";
    }

    return $DataString;
}
