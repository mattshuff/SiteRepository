<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//INSERT INTO `ToDo` (`ToDoID`, `ToDoContent`) VALUES (NULL, 'test') 

$Value = $_GET['QueryValue'];
$sql = "INSERT INTO ToDo (`ToDoContent`) VALUES ('" .$Value ."')"; ;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>