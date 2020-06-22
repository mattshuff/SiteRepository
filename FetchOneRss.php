<?php
//header( 'Content-Type: application/rss+xml' );
$url = $_POST["url"];
$feed_url = 'https://news.google.com/news/rss/headlines/section/topic/BUSINESS';
$content = file_get_contents( $url );

echo $content;
