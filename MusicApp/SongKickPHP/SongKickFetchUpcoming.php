<?php
session_start();

$ch = curl_init();

$username = "shuf";
$APIkey = "8qBFTSlNMQi5EuPy";


$url = 'https://api.songkick.com/api/3.0/users/'.$username.'/calendar.json?reason=attendance&apikey='.$APIkey;


curl_setopt_array($ch,
  array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true
  )
);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

echo $result;
?>
