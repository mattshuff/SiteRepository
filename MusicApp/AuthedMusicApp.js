//on page load
$(document).ready(function () {

var CurrentURl = window.location.href;
var AuthCode = CurrentURl.split("?code=");

LoadPreferences();
//check if existing session keys are valid and grab new if not 
$.ajax({
    url: "/MusicApp/SpoitfyPHP/GetSpotifyKeys.php",
    type: 'POST',
    async: false,
    data: {
        AuthCodePOST: AuthCode[1]                 
    },
    success: function (data) {           
      console.log(data);
  }
  });

//create album art images in scrolling div
FillAlbumArt();

//add user profile to screen - changes depending on user 
DrawUserInfo();

//start scroll
$(AlbumArtDiv).scrollTop(0);
ScrollingFeature(true);

//fill in upcoming events
PopulateConcertDiv();



});

//get recently played songs and draw them to the scroll box
function FillAlbumArt(){
  var AlbumArtDiv = document.getElementById("AlbumArtDiv");
  AlbumArtDiv.innerHTML = '';
  var RecentItems = GetRecentTracks();

  
  
  //create image for each recent track 
  for(var i = 0; i < RecentItems.length; i++){
      var img = document.createElement('img'); 
      img.src = RecentItems[i].album.images[1].url;
      img.style = "width: 190px; height: 190px; display: inline-block;";
      img.SongData = RecentItems[i];
      img.onclick = ImageOnclick;
      AlbumArtDiv.appendChild(img);
  }
}

//function to handle album art clicks 
function ImageOnclick(){
  //clear scroll box 
  var AlbumArtDiv = document.getElementById("AlbumArtDiv");
  AlbumArtDiv.innerHTML = '';

  //create flex container for song info 
  AlbumArtFlex = document.createElement('div');
  AlbumArtFlex.style="display: flex; flex-direction: row;";
  AlbumArtDiv.appendChild(AlbumArtFlex);

  console.log(this.SongData);
  var SongData=this.SongData;

  //add album art image
  var AlbumArtImage = document.createElement('img');
  AlbumArtImage.src=SongData.album.images[0].url;
  AlbumArtImage.style="width: auto;height: 600px;";
  AlbumArtFlex.appendChild(AlbumArtImage);

  //add text info wrapper
  var SongTextInfoWrapper = document.createElement('div');
  SongTextInfoWrapper.style.width="800px";

  //title wrapper
  var SongTitle = document.createElement('p');
  SongTitle.innerText=SongData.name;
  SongTextInfoWrapper.appendChild(SongTitle);

  AlbumArtFlex.appendChild(SongTextInfoWrapper);

   //add close button to return to scroll 
   var CloseButton = document.createElement('p');
   CloseButton.innerText="X";
   CloseButton.style="float: right; padding-right: 10px; color: red; font-style: oblique; font-weight: bolder;cursor: pointer;";
   CloseButton.onclick=FillAlbumArt;
   
   AlbumArtFlex.appendChild(CloseButton);
}

//logic to control the scroll box panning up and down 
function ScrollingFeature(ScrollOn){

  if(ScrollOn==true){

  var top;
  

  pageScroll();
}
else{
  clearTimeout(scrolldelay);
}
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
function GetRecentTracks() {
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

return TrackImageDataJson.tracks;
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
function DrawUserInfo(){
  var DisplayName;
  $.ajax({
    url: "/MusicApp/SpoitfyPHP/GetUserProfile.php",
    type: 'POST',
    async: false,
    success: function (data) {    
      var JSONobject = JSON.parse(data);
        
      DisplayName = JSONobject.display_name;
    }
  });
var userInfoDiv = document.getElementById("userInfoDiv");
userInfoDiv.style="float:right;";

var SpotifyLogoImage = document.createElement('img');
SpotifyLogoImage.src="/MusicApp/Assets/Spotify_Logo.png";
SpotifyLogoImage.style="width: auto; height: 30px; margin-top: 0x;float: inline-start;padding-bottom: 0px;";

userInfoDiv.appendChild(SpotifyLogoImage);


var ProfileName = document.createElement('p');
ProfileName.innerHTML=DisplayName;
ProfileName.style="display: inline; margin: 0px;  padding-left: 10px;font-style: italic;font-size: 18px;";

userInfoDiv.appendChild(ProfileName);
  
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

function LoadPreferences() {
  var ColourMode = localStorage.ColourMode;
  if (ColourMode == "light") {

      var body = document.getElementsByTagName('body')[0];
      body.style.backgroundColor = "seashell";
      body.style.color = "black";
  }
  else {
      var body = document.getElementsByTagName('body')[0];
      body.style.backgroundColor = "#2C2F33";
      body.style.color = "antiquewhite";


  }
}