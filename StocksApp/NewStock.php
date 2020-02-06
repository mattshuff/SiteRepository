<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);


$StockName = $_GET['StockNamePost'];
$StockTicker = $_GET['StockTickerPost'];


    
    $APIurl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED" . "&symbol=" . $StockTicker . "&apikey=DET6IF6YAHK5PGVO";
    $JSONstring = file_get_contents($APIurl);
    $JSONarray = json_decode($JSONstring, true);
    

    //an array of all the dates avaliable 
    $Keys = array_keys($JSONarray["Time Series (Daily)"]);
                               

    $FiveDayData = "";
        //load past five days into a string
        for ($y = 0; $y <= 5; $y++) {      
    
            //append relevant date
            $FiveDayData .= $Keys[$y] . " ";
    
            //fetch data
            $FiveDayData .= $JSONarray["Time Series (Daily)"][$Keys[$y]]["4. close"];
    
            //trim to 2 sig. fig.
            $FiveDayData = substr($FiveDayData, 0, -2);
    
            //append new date identifier
            $FiveDayData .= "&";        
        }


    $APIurl = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED" . "&symbol=" . $StockTicker . "&apikey=DET6IF6YAHK5PGVO";

    $JSONstring = file_get_contents($APIurl);
    $JSONarray = json_decode($JSONstring, true);

    $Keys = array_keys($JSONarray["Monthly Adjusted Time Series"]);

    $FiveMonthData = "";
    //load past five days into a string
    for ($y = 0; $y <= 5; $y++) {      

        //append relevant date
        $FiveMonthData .= $Keys[$y] . " ";

        //fetch data
        $FiveMonthData .= $JSONarray["Monthly Adjusted Time Series"][$Keys[$y]]["4. close"];

        //trim to 2 sig. fig.
        //$FiveMonthData = substr($FiveMonthData, 0, -2);

        //append new date identifier
        $FiveMonthData .= "&";        
    }
        
    //INSERT INTO `Stocks`(`StockNickName`, `StockTicker`, `FiveDayData`, `FiveMonthData`,)

$insert = "INSERT INTO `Stocks`(`StockNickName`, `StockTicker`,`FiveDayData`,`FiveMonthData`)";
$values = "VALUES ('$StockName','$StockTicker','$FiveDayData','$FiveMonthData')";

$sql = $insert.$values;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>". "<br>". "<br>" . mysqli_error($connect);
}
?>