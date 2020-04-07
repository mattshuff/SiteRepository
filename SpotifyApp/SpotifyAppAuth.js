$(document).ready(function () {

var CurrentURl = window.location.href;
var AuthCode = CurrentURl.split("?code=");

//check if existing session keys are valid and grab new if not 
//this should run every time in order to check session is still valid
$.ajax({
    url: "/SpotifyApp/GetKeys.php",
    type: 'POST',
    data: {
        AuthCodePOST: AuthCode[1]                 
    },
    success: function (data) {                   
    }
  });

var ImageURLS = GetRecentImages();
console.log(ImageURLS);

var AlbumArtDiv = document.getElementById("AlbumArtDiv");
for(var i = 0; i < ImageURLS.length; i++){
    var img = document.createElement('img'); 
    img.src = ImageURLS[i].url;
    AlbumArtDiv.appendChild(img);


}

function GetRecentImages() {
  //get track history and save to variable 
  var TrackHistoryJSON;
  $.ajax({
    url: "/SpotifyApp/PHPcontrols/GetTrackHistory.php",
    type: 'POST',
    async: false,
    success: function (data) {           
        TrackHistoryJSON = data;

    }
  });

  //convert json object to JS version? (need this to search it)
  TrackHistoryJSON = JSON.parse(TrackHistoryJSON);
 
  //TRACK HISTORY PROVIDED ONLY GIVES BASIC DETAILS OF EACH TRACK
  //THEREFORE ANOTHER REQUEST IS NEEDED TO GET THE IMAGE URLS:

  //create an array with all the track ids
  var TrackIDArray = [];
  for(var i = 0; i < TrackHistoryJSON.items.length; i++){
        TrackIDArray.push(TrackHistoryJSON.items[i].track.id);
  }

  //fetch full info of track ids
  var TrackImageDataJson;
  $.ajax({
    url: "/SpotifyApp/PHPcontrols/GetTrackData.php",
    type: 'POST',
    async: false,
    data: {TrackIDArray: TrackIDArray},
    success: function (data) {           
        TrackImageDataJson = data;

    }
  });

    //convert json object to JS version? (need this to search it)
  TrackImageDataJson = JSON.parse(TrackImageDataJson);

  //create an array with all track image urls 
var TrackImageURLArray = [];
for(i = 0; i < TrackImageDataJson.tracks.length; i++){
    //.images is indexed 0-2 with 0 being the largest image
    TrackImageURLArray.push(TrackImageDataJson.tracks[i].album.images[2]);
}
return TrackImageURLArray;
}



function Skip() {
    $.ajax({
        url: "/SpotifyApp/PHPcontrols/SkipCurrent.php",
        type: 'POST',
        data: {
                       
        },
        success: function (data) {           
            
    
        }
      });
}
});