function parseRSS() {
    $.ajax({
      url: '/LandingPage/PHP-Controls/FetchRss.php',
        async:true,
      success: function(data) {
        var XMLStrings = data.split("\n");

        parser = new DOMParser();
        var BusinessXML;
        BusinessXML = parser.parseFromString(XMLStrings[0],"text/xml");
        var TopicArticles = BusinessXML.children[0].children[0].children;
        var XMLarticle;
        var Text;
        var x;

        //try to construct and append 8 buisiness articles
        for(x = 8; x<18;x++){
            XMLarticle = TopicArticles[x];
            

            var BuisinessBody = document.createElement("div");
            Text = XMLarticle.textContent;
            try {
                Text = Text.split("<li>")[1];
                Text = Text.split("<li>")[0];
            } catch (error) {
                console.log("Article Incorrect Format");
                Text="";
            }
            
            BuisinessBody.innerHTML = Text;
            BuisinessBody.style.paddingBottom = "5px";
            BuisinessBody.style.fontSize = "17px";
           

            var googlefeed = document.getElementById("GoogleFeed");
            googlefeed.appendChild(BuisinessBody);
        }

       

        var TechXML;
        TechXML = parser.parseFromString(XMLStrings[1],"text/xml");
        TopicArticles = TechXML.children[0].children[0].children;
        for(x = 8; x<12;x++){
            XMLarticle = TopicArticles[x];
            

            TechBody = document.createElement("div");
            Text = XMLarticle.textContent;
            try {
                Text = Text.split("<li>")[1];
                Text = Text.split("<li>")[0];
            } catch (error) {
                console.log("Article Incorrect Format");
                Text="";
            }
            
            TechBody.innerHTML = Text;
            TechBody.style.paddingBottom = "5px";
            TechBody.style.fontSize = "17px";
           

            var TechFeed = document.getElementById("TechFeed");
            TechFeed.appendChild(TechBody);
        }

        var PoliticsXML;
        PoliticsXML = parser.parseFromString(XMLStrings[2],"text/xml");
        TopicArticles = PoliticsXML.children[0].children[0].children;

        for(x = 8; x<13;x++){
            XMLarticle = TopicArticles[x].children[4];

            var PoliticsBody = document.createElement("div");
            Text = XMLarticle.textContent;
            
            PoliticsBody.innerHTML = Text;
            PoliticsBody.style.paddingBottom = "5px";
            PoliticsBody.style.fontSize = "17px";
            
           
            var PoliticsFeed = document.getElementById("PoliticsFeed");
            PoliticsFeed.appendChild(PoliticsBody);
        }
      }

    });
  }