<?php
session_start();

$ch = curl_init();

$username = "shuf";
$APIkey = "8qBFTSlNMQi5EuPy";



//change this to calender request

//https://api.songkick.com/api/3.0/users/{username}/calendar.json?reason={reason}&apikey={your_api_key}
$url = 'https://api.songkick.com/api/3.0/users/'.$username.'/events.json?apikey='.$APIkey."&attendance=all";
//echo $url;
//echo "<br>";


curl_setopt_array($ch,
  array(
    CURLOPT_URL => $url,
    CURLOPT_HEADER => FALSE,
    CURLOPT_RETURNTRANSFER => FALSE,
  )
);

$result = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
//echo $result;
?>
