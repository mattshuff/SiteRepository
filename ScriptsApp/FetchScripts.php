<?php
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT * FROM Scripts where 1=1";

$result = mysqli_query($connect, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["ScriptName"].'*';
        echo $row["ScriptURL"].'*';
        echo $row["ScriptDescription"].'*';

    }
} else {
    echo "0 results";
}
?>