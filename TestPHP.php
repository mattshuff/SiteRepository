<?php

$func = "TIME_SERIES_MONTHLY_ADJUSTED";
 $APIurl = "https://www.alphavantage.co/query?function=" . $func . "&symbol=SPY&apikey=NFEDDI21S94AF6RO";
 
 $JSONstring = file_get_contents($APIurl);
    $JSONarray = json_decode($JSONstring, true);
 
 
 
 $TEST = array_keys($JSONarray["Monthly Adjusted Time Series"]);
 $counter=0;
 foreach ($TEST as $row) {
   echo $counter . " " . $row . "           ";
   $counter++;
}