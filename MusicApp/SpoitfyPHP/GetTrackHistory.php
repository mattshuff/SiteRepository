<?php
session_start();

$ch = curl_init();

//change limit in url here for more or less iamges
curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/me/player/recently-played?type=track&limit=49');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


$headers = array();
$headers[] = 'Accept: application/json';
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: Bearer '.$_SESSION["AccessKey"];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
echo $result;
?>
