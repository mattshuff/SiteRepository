<?php
    session_start();

    //check key gen time 
    $TimeSinceKeyGen = time() - $_SESSION["KeyGenTime"];
    echo $TimeSinceKeyGen;
    if($TimeSinceKeyGen > 3000) { 
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
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

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