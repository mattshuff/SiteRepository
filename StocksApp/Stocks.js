//wait until the page is ready
$(document).ready(function() {
    console.log("test");
            var ContentWrapper = document.getElementById("Content");

            var Tracker = document.createElement("div");
            Tracker.setAttribute("ID","Tracker");

            var FiveDayHistoryWrapper = document.createElement("div");
            FiveDayHistoryWrapper.setAttribute("ID","HistoryWrapper");

            var SixMonthHistoryWrapper = document.createElement("div");
            SixMonthHistoryWrapper.setAttribute("ID","HistoryWrapper");

            var FiveDayData;
            FiveDayData = PopulateData("TIME_SERIES_DAILY_ADJUSTED","SPY");

            var SixMonthData;
            SixMonthData = PopulateData("TIME_SERIES_MONTHLY","SPY");



            for(var x = 0; x < FiveDayData.length; x+=1){
                FiveDayHistoryWrapper.append(FiveDayData[x]);
                SixMonthHistoryWrapper.append(SixMonthData[x]);
            }
             
              ContentWrapper.append(Tracker);
              Tracker.append(FiveDayHistoryWrapper);
              Tracker.append(SixMonthHistoryWrapper);
              
            })
           

function PopulateData(func,symbol) {
    var APIurl = "https://www.alphavantage.co/query?function="+func+"&symbol="+symbol+"&apikey=DET6IF6YAHK5PGVO";
    var ReturnValue= [];
    console.log(APIurl);
    //ajax call to fetch the API
    $.ajax({
        url: APIurl,
        async: false,
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {

            //select the daily data
            var label;
            var test = func;
            console.log("label = " + label);

            if(test="TIME_SERIES_DAILY_ADJUSTED"){
                label = "Time Series (Daily)";
            }
            if(test="TIME_SERIES_MONTHLY"){
                label = "Monthly Time Series";	
            }
            console.log("label = " + label);

            var timeData = data[label];

            console.log(timeData);
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



