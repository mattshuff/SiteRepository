
//prompt the user to log in to spotify, recieve an Oauth token for that specific suer in return
var ClientID = "54125d61764d46cea16501d95e57df67";
var RedirectURI = "http://localhost:85/SpotifyApp/SpotifyAppAuth.html";
var Scopes = "user-read-recently-played user-modify-playback-state";

var OauthTokenURL = "https://accounts.spotify.com/authorize?response_type=code&client_id=" + ClientID + "&scope=" + encodeURI(Scopes) + "&redirect_uri=" + (RedirectURI);


window.location.href = OauthTokenURL;

//not much code here as the callback is to SpotifyApp\SpotifyAppAuth.js to prevent looping.
//need to find out if this is best practice at some point not sure 



