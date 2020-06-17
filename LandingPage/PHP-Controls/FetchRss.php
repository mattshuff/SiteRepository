<?php
//header( 'Content-Type: application/rss+xml' );

$feed_url = 'https://news.google.com/news/rss/headlines/section/topic/BUSINESS';
$content = file_get_contents( $feed_url );

echo $content;

$feed_url = 'https://news.google.com/news/rss/headlines/section/topic/TECHNOLOGY';
$content = file_get_contents( $feed_url );
echo "\n";
echo $content;

//https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRFZ4ZERBU0JXVnVMVWRDS0FBUAE?hl=en-GB&gl=GB&ceid=GB:en
$feed_url = 'https://news.google.com/rss/topics/CAAqKQgKIiNDQklTRkFnTWFoQUtEblJvWlhScGJXVnpMbU52TG5WcktBQVAB?hl=en-GB&gl=GB&ceid=GB:en';
$content = file_get_contents( $feed_url );
echo "\n";
echo $content;


exit;
?>