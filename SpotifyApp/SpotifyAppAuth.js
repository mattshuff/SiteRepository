var CurrentURl = window.location.href;
var AuthCode = CurrentURl.split("?code=");

//check if existing session keys are valid and grab new iff not 
$.ajax({
    url: "/SpotifyApp/GetKeys.php",
    type: 'POST',
    data: {
        AuthCodePOST: AuthCode[1]                 
    },
    success: function (data) {           
    var Keys = data.split(/\n/);
    console.log(Keys);

    }
  });

  //to do - work out what we want this to actually do 

  