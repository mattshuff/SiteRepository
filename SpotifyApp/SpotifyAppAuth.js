//on page load
$(document).ready(function () {

var CurrentURl = window.location.href;
var AuthCode = CurrentURl.split("?code=");

//check if existing session keys are valid and grab new if not 
$.ajax({
    url: "/SpotifyApp/GetKeys.php",
    type: 'POST',
    data: {
        AuthCodePOST: AuthCode[1]                 
    },
  });

//create album art images in scrolling div
var ImageURLS = GetRecentImages();

var AlbumArtDiv = document.getElementById("AlbumArtDiv");
for(var i = 0; i < ImageURLS.length; i++){
    var img = document.createElement('img'); 
    img.src = ImageURLS[i].url;
    img.style.width = "190px";
    img.style.height = "190px";
    img.style.display = "inline-block";
    AlbumArtDiv.appendChild(img);
}

//start scroll
ScrollingFeature();

});

//logic to control the scroll box panning up and down 
function ScrollingFeature(){
  var top = true;
$(AlbumArtDiv).scrollTop(0);

pageScroll();
function pageScroll() {
  //decide if scrolling up or down
  if(top === true) { AlbumArtDiv.scrollBy(0,1); }
  else { AlbumArtDiv.scrollBy(0,-1); }
  
  //check if scrolled all the way to the bottom
  var ScrolledToBottom = AlbumArtDiv.scrollTop === (AlbumArtDiv.scrollHeight - AlbumArtDiv.offsetHeight);
  if(ScrolledToBottom){
    top = false;
  }
if(AlbumArtDiv.scrollTop === 0) {top = true;}

  scrolldelay = setTimeout(pageScroll,30);
}
}

//returns an array of image URLs for the last 50 songs listened to 
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

  //fetch extended info of track ids not provided above
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
  console.log(TrackImageDataJson);
  //create an array with all track image urls 
var TrackImageURLArray = [];
for(i = 0; i < TrackImageDataJson.tracks.length; i++){
    //.images is indexed 0-2 with 0 being the largest image
    TrackImageURLArray.push(TrackImageDataJson.tracks[i].album.images[1]);
}
return TrackImageURLArray;
}


//CONTROL PANEL FUNCTIONS

//skips the currently playing song
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
