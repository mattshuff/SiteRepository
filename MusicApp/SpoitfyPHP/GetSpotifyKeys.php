<?php
    session_start();


    //check if the key gen time session var is set
    if(isset($_SESSION["KeyGenTime"])){
    $TimeSinceKeyGen = time() - $_SESSION["KeyGenTime"];
    echo "SECONDS SINCE KEY GEN: ".$TimeSinceKeyGen;
    NewLine();
    echo "Stored Access Key".$_SESSION["AccessKey"];

    NewLine();
    NewLine();

    //if the key has expired, fetch a new one
    if($TimeSinceKeyGen > 1500) { 
        echo("time since key gen greater than x... generating new keys ");

        $_SESSION["AuthCode"] = $_POST["AuthCodePOST"];

        $KeysArray = getKeys();
    
        $_SESSION["AccessKey"] = $KeysArray["accessKey"];
        $_SESSION["RefreshToken"] = $KeysArray["refreshToken"];
        $_SESSION["KeyGenTime"] = time();
        NewLine();
        echo "Generated access key: ".$_SESSION["AccessKey"];
        NewLine();
        echo "Generated refresh key: ".$_SESSION["RefreshToken"];
    }
    //assume keys are valid, no need to fetch new
    else{
        echo("existing keys valid");
        NewLine();
        echo $_SESSION["AccessKey"];
        NewLine();
        echo $_SESSION["RefreshToken"];
    }

    }
    //if key gen time is unset, fetch new keys 
    else{

        echo("SESSION VAR KEYGEN TIME UNSET, FETCHING NEW KEYS");
        NewLine();
        NewLine();
        $_SESSION["AuthCode"] = $_POST["AuthCodePOST"];
        $KeysArray = getKeys();

        $_SESSION["AccessKey"] = $KeysArray["accessKey"];
        $_SESSION["RefreshToken"] = $KeysArray["refreshToken"];
        $_SESSION["KeyGenTime"] = time();
        
        echo "Generated access key: ".$_SESSION["AccessKey"];
        
    }
    

//function to make api call
function getKeys() {
    $parameters = [
        'client_id' => '54125d61764d46cea16501d95e57df67',
        'client_secret' => '5d279a849bd642d7b2ee6f2f61380aed',
        'code' => $_SESSION["AuthCode"],
        'grant_type' => 'authorization_code',
        'redirect_uri' => 'http://localhost:85/MusicApp/AuthedMusicApp.html',
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

function NewLine(){
    echo("\n");
    echo("<br>");
}