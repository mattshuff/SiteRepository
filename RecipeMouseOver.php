<?php
$hostname = "localhost";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$Search = $_GET['QueryValue'];
$sql = "SELECT * FROM `recipes` WHERE `RecipeName` = '";
$sql .= $Search;
$sql .= "'";


$result = $connect->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["RecipeIngredients"]. "*";
    }
} else {
    echo "0 results";
}

?>