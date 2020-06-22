<?php
//header( 'Content-Type: application/rss+xml' );

$feed_url = 'https://news.google.com/news/rss/headlines/section/topic/BUSINESS';
$content = file_get_contents( $feed_url );

echo $content;
