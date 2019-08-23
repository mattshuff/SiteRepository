//wait until the page is ready
$(document).ready(function() {

            var ContentWrapper = document.getElementById("Content");

            var Tracker = document.createElement("div");
            Tracker.setAttribute("ID","Tracker");

            var HistoryWrapper = document.createElement("div");
            HistoryWrapper.setAttribute("ID","HistoryWrapper");

            var data;
            data = PopulateData("TIME_SERIES_DAILY_ADJUSTED","SPY");

            for(var x = 0; x < data.length; x+=1){
                HistoryWrapper.append(data[x]);
                console.log(data[x]);
            }
             
              ContentWrapper.append(Tracker);
              Tracker.append(HistoryWrapper);
              
            })
           

function PopulateData(func,symbol) {
    var APIurl = "https://www.alphavantage.co/query?function="+func+"&symbol="+symbol+"&apikey=DET6IF6YAHK5PGVO";
    var ReturnValue= [];

    //ajax call to fetch the API
    $.ajax({
        url: APIurl,
        async: false,
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {

            //select the daily data
            var label = "Time Series (Daily)";
            var timeData = data[label];

            //arrays to be logged to
            dates = [];
            values = [];

            //iterate through our data, get dates and closing values
            for (const date of Object.keys(timeData)) {
                //convert date to sensible format and push to array
                var DateVar = new Date(date);
                var DateString = DateVar.toLocaleDateString("en-GB");
                dates.push(DateString);

                //get value and push to array
                var ClosingValue = timeData[date]["4. close"]
                values.push(ClosingValue);
            }

            //setup for looping through           
            var Elements = [];

            for (var x = 4; x >= 0; x -= 1) {

                //create P element
                var para = document.createElement("p");
                var node = document.createTextNode(dates[x] + " - " + values[x] + " ");
                para.appendChild(node);

                //colour elements
                if (values[x] > values[x - 1]) {
                    para.setAttribute("style", "color:#03fc49;");          
                } else {
                    para.setAttribute("style", "color:red;");                   
                }
                para.setAttribute("ID", "HistoryP");

                //push elements to array
                Elements.push(para);           
            }
            var test = Elements.reverse(); 
            Object.assign(ReturnValue, test);             
        }
    })  
    return ReturnValue;
}



