<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT * FROM `News`";

$result = mysqli_query($connect, $sql);
$row = $result->fetch_assoc();

while ($row = $result->fetch_assoc()) { //each row
    try {
        $ArticlesXML = FetchGoogle($row["CategoryLink"]);
        PushDB($ArticlesXML, $connect);
    } catch (\Throwable $th) {
        //if call times out
    }
}
function FetchGoogle($link)
{
    $content = file_get_contents($link);
    return $content;
}
function PushDB($XMLString, $connect)
{
    $xml = simplexml_load_string($XMLString);

    $json = json_encode($xml);

    $array = json_decode($json, TRUE);
    $sql = "UPDATE `News` SET `CategoryJSON`='" . addslashes($json) . "'";
    $result = mysqli_query($connect, $sql);
}
