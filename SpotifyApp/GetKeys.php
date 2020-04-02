<?php

session_start();

//bools to check if exisiting keys can be used 
$IsAccessKeySet = isset($_SESSION["AccessKey"]);
$IsRefreshToken = isset($_SESSION["RefreshToken"]);
$IsTokenValid = ""; if(time() - $_SESSION["KeyGenTime"] < 7000){$IsTokenValid=true;};
if($IsAccessKeySet and $IsRefreshToken and $IsTokenValid)    
   {
    echo $_SESSION["AccessKey"];
    echo("\n");
    echo $_SESSION["RefreshToken"];
}

//if existing keys not valid,generate new ones here
else{
    $_SESSION["AuthCode"] = $_POST["AuthCodePOST"];

    $KeysArray = getKeys();

    $_SESSION["AccessKey"] = $KeysArray["accessKey"];
    $_SESSION["RefreshToken"] = $KeysArray["refreshToken"];
    $_SESSION["KeyGenTime"] = time();

    echo ($KeysArray["accessKey"]);
    echo("\n");
    echo $KeysArray["refreshToken"];
}

function getKeys() {
    $parameters = [
        'client_id' => '54125d61764d46cea16501d95e57df67',
        'client_secret' => '5d279a849bd642d7b2ee6f2f61380aed',
        'code' => $_SESSION["AuthCode"],
        'grant_type' => 'authorization_code',
        'redirect_uri' => 'http://localhost:85/SpotifyApp/SpotifyAppAuth.html',
    ];
    
    $fields_string = http_build_query($parameters);
    
    //open connection
    $ch = curl_init();
    
    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($ch,CURLOPT_POST, true);
    curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
    
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 
    
    //execute post
    $result = curl_exec($ch);

    //return access key
    $JSONarray = json_decode($result, true);
    $AccessKey = $JSONarray["access_token"];
    $RefreshToken = $JSONarray["refresh_token"];
    
    $ReturnValues = [
        "accessKey" => $AccessKey,
        "refreshToken" => $RefreshToken
    ];

    return $ReturnValues;
}