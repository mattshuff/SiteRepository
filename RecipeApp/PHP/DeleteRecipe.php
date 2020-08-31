<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$RecipeName = $_GET["RecipeName"];

$SQL = "DELETE FROM `Recipes` WHERE `RecipeName` = '" .$RecipeName ."';";
$Result = mysqli_query($connect, $SQL);


//delete from storage
$target_dir = dirname(getcwd())."/Images/";
$IngredientsFileName = $RecipeName."IngredientsImage".".JPG";
$IngredientsTargetPath = $target_dir . basename($IngredientsFileName);

$target_dir = dirname(getcwd())."/Images/";
$MethodFileName = $RecipeName."MethodImage".".JPG";
$MethodTargetPath = $target_dir . basename($MethodFileName);

unlink($IngredientsTargetPath);
unlink($MethodTargetPath);
