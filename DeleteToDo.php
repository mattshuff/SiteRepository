<?php
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$Search = $_GET['QueryValue'];
$sql = "DELETE FROM `ToDo` WHERE `ToDoContent` = '";
$sql .= $Search;
$sql .= "')";
echo $sql;

if (mysqli_query($connect, $sql)) {
    echo "Record deleted";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>