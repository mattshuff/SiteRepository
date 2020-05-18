//on page load
$(document).ready(function () {

var CurrentURl = window.location.href;
var AuthCode = CurrentURl.split("?code=");

//check if existing session keys are valid and grab new if not 
$.ajax({
    url: "/MusicApp/SpoitfyPHP/GetSpotifyKeys.php",
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

//add user profile to screen - changes depending on user 
DrawProfileImage();

//start scroll
ScrollingFeature();

//fill in upcoming events
PopulateConcertDiv();


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
  
  if(ScrolledToBottom){ top = false; }
  if(AlbumArtDiv.scrollTop === 0) {top = true;}

  scrolldelay = setTimeout(pageScroll,30);
  }
}

//returns an array of image URLs for the last 49 songs listened to 
//49 because 50 has one orphan image
function GetRecentImages() {
  //get track history and save to variable 
  var TrackHistoryJSON;
  $.ajax({
    url: "/MusicApp/SpoitfyPHP/GetTrackHistory.php",
    type: 'POST',
    async: false,
    success: function (data) {           
        TrackHistoryJSON = data;

    }
  });

  //parse json into object
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
    url: "/MusicApp/SpoitfyPHP/GetTrackData.php",
    type: 'POST',
    async: false,
    data: {TrackIDArray: TrackIDArray},
    success: function (data) {           
        TrackImageDataJson = data;

    }
  });

  //parse json into object
  TrackImageDataJson = JSON.parse(TrackImageDataJson);
  
  //create an array with all track image urls 
var TrackImageURLArray = [];
for(i = 0; i < TrackImageDataJson.tracks.length; i++){
    //.images is indexed 0-2 with 0 being the largest image
    TrackImageURLArray.push(TrackImageDataJson.tracks[i].album.images[1]);
}
return TrackImageURLArray;
}

//runs once on startup, fetch the users upcoming events and draws them to the concert div 
function PopulateConcertDiv(){

  var JsonString;
  $.ajax({
    url: "/MusicApp/SongKickPHP/SongKickFetchUpcoming.php",
    type: 'POST',
    async: false,
    success: function (data) {           
      JsonString = data;
    }
  });
var JSONobject = JSON.parse(JsonString);
JSONobject = JSONobject.resultsPage.results.calendarEntry;

for(var x = 0; x<JSONobject.length;x++){
console.log(JSONobject[x]);

//create single event wrapper 
var EventWrapper = document.createElement("span");
EventWrapper.classList.add("EventWrapper");

//get artist image 
var EventImage = document.createElement("img");
EventImage.classList.add("EventFloatStart");
//GET IMAGE PATH FOR ARTIST HERE (MAY NEED SPOTIFY CALL)
EventWrapper.appendChild(EventImage);

//create text span
var EventTextWrapper = document.createElement("span");
EventTextWrapper.classList.add("EventFloatStart");
EventTextWrapper.style.width = "200px";
EventWrapper.appendChild(EventTextWrapper);

//create event title P
var EventTitleP = document.createElement("p");
EventTitleP.classList.add("EventTitle");
var EventTitle = JSONobject[x].event.displayName;

//remove date from title 
for(var y = EventTitle.length;y>0;y--){
  if(EventTitle[y] == '('){
    EventTitle = EventTitle.slice(0,y);
    break;
  }
}

EventTitleP.innerText = EventTitle;
EventTextWrapper.appendChild(EventTitleP);

//create event date P
var EventDate = document.createElement("a");
EventDate.classList.add("EventDate");
EventDate.innerText = JSONobject[x].event.start.date;
EventDate.href= JSONobject[x].event.uri;
EventTextWrapper.appendChild(EventDate);


//apend to concert div
var ConcertDiv = document.getElementById("ConcertDiv");
ConcertDiv.appendChild(EventWrapper);
}

}

//get user profile image and write to screen
function DrawProfileImage(){
  var ImageURL;
  $.ajax({
    url: "/MusicApp/SpoitfyPHP/GetProfileImage.php",
    type: 'POST',
    success: function (data) {           
      ImageURL = data;
    }
  });

  
}

//skips the currently playing song
function Skip() {
  $.ajax({
      url: "/MusicApp/SpoitfyPHP/SkipCurrent.php",
      type: 'POST',
      data: {
                    
      },
      success: function (data) {           
          
  
      }
    });
}
