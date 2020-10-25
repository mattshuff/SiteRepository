<?php
$hostname = "localhost";
$username = "admin";
$password = "Sagwala@1";
$databaseName = "matt_SiteData";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//INSERT INTO `ToDo` (`ToDoID`, `ToDoContent`) VALUES (NULL, 'test') 

$Value = "test";
$sql = "INSERT INTO ToDo (`ToDoContent`) VALUES ('" .$Value ."')"; ;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>