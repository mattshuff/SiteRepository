<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT `StockNickName`,`FiveDayData`,`FiveMonthData` FROM `Stocks` WHERE 1";
$Result = mysqli_query($connect, $sql);

while ($row = $Result->fetch_row()) {
    $rows[] = $row;
}
foreach ($rows as $row) {
    foreach ($row as $string) {
        echo $string . "-";
    }
}
