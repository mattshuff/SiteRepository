<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);
header( 'Content-Type: application/rss+xml' );
$url = $_POST["QueryURL"];
$content = file_get_contents( $url );

echo $content;
