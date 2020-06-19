<?php
 //ae3448b1e6ac4f4e8563e2262312ce57
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://newsapi.org/v2/top-headlines?category=business&language=Fr');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


$headers = array();
//$headers[] = 'Accept: application/json';
//$headers[] = 'Content-Type: application/json';
$headers[] = 'x-api-key: ae3448b1e6ac4f4e8563e2262312ce57';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
echo $result;


if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);