<?php
header( 'Content-Type: application/rss+xml' );
$url = $_POST["QueryURL"];
$content = file_get_contents( $url );

echo $content;
