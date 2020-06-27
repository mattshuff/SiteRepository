<?php
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

$sql = "SELECT * FROM `News`";

$result = mysqli_query($connect, $sql);


while ($row = $result->fetch_assoc()) { //each row
    try {
        $ArticlesXML = FetchGoogle($row["CategoryLink"]);

        if ($ArticlesXML != "False") {
            PushDB($ArticlesXML,$row["CategoryLink"], $connect);
        }
    } catch (\Throwable $th) {
        //if call times out
    }
}
function FetchGoogle($link)
{
    try {
        $content = file_get_contents($link);
        return $content;
    } catch (\Throwable $th) {
        return "False";
        echo("assumed time out, error caught");
    }
}
function PushDB($XMLString,$link, $connect)
{
    $xml = simplexml_load_string($XMLString);

    $json = json_encode($xml);

    $array = json_decode($json, TRUE);
    $sql = "UPDATE `News` SET `CategoryJSON`= '" . addslashes($json) . "' where CategoryLink = '".$link ."';";
    echo $sql;
    echo("\n");
    $result = mysqli_query($connect, $sql);
}
