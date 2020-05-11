<?php
session_start();
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,            'https://api.spotify.com/v1/me/player/next' );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     '' ); 
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Authorization: Bearer '.$_SESSION["AccessKey"])); 

$result=curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

echo $result;
?>