<?php
$StringURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";
$StringURL.= $_GET["Symbol"];
$StringURL.= "&apikey=DET6IF6YAHK5PGVO";

$JSONstring = file_get_contents($StringURL);
echo $JSONstring;