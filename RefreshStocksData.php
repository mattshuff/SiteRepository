<?php
#region Connection properties

$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);
#endregion

//fetch all tickers from DB 
$sql = "SELECT `StockTicker` FROM `Stocks`";
$Result = mysqli_query($connect, $sql);
$Tickers = $Result->fetch_all(MYSQLI_NUM);

//Fetch next index to refresh
$sql = "SELECT `CurrentIndex` FROM `Stocks`";
$Result = mysqli_query($connect, $sql);
$Result = $Result->fetch_all(MYSQLI_NUM);
$CurrentIndex = $Result[0][0];

//fetch new data 
$TickerToRefresh = $Tickers[$CurrentIndex][0];
RefreshDayValues($TickerToRefresh,$connect);
RefreshMonthValues($TickerToRefresh,$connect);

//logic to increase the current index
$TickerCount = count($Tickers);
if($CurrentIndex >= $TickerCount-1){ $CurrentIndex = 0; }    
else{ $CurrentIndex = $CurrentIndex + 1; }

//sql statement to increase current index
$sql = "UPDATE `Stocks` SET `CurrentIndex`= " . $CurrentIndex;
$Result = mysqli_query($connect, $sql);

//fetch and store new 5 day data 
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

    $sql = "UPDATE `Stocks` SET `FiveDayData` = '";
    $sql .= $DataString;
    $sql .= "' WHERE `StockTicker` ='";
    $sql .= $Ticker;
    $sql .= "'";
    $Result = mysqli_query($connect, $sql);   
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

    $sql = "UPDATE `Stocks` SET `FiveMonthData` = '";
    $sql .= $DataString;
    $sql .= "' WHERE `StockTicker` ='";
    $sql .= $Ticker;
    $sql .= "'";
    $Result = mysqli_query($connect, $sql);   
}