//wait until the page is ready
$(document).ready(function () {

    //url of API call, eventually this will be constructed using the Tickers.txt
var APIurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPY&apikey=DET6IF6YAHK5PGVO';

//ajax call to fetch the API
$.ajax({
    url: APIurl,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {

        //select the daily data
        var label = "Time Series (Daily)";
        var timeData = data[label];

        //arrays to be logged to
        dates = [];
        values = [];

        //log to console for debugging
        console.log(timeData);

        //iterate through our data, get dates and closing values
        for (const date of Object.keys(timeData)) { 
            var DateVar = new Date(date);
            var DateString = DateVar.toLocaleDateString("en-GB");

            var ClosingValue = timeData[date]["4. close"]

            dates.push(DateString);
            values.push(ClosingValue);
        }

        var CombinedArray = [];
        for(var x = 0; x <5;x++){
        CombinedArray.push( dates[x] + " - " + values[x]);
        }

        var fivedayview = document.getElementById("FiveDayView");
        fivedayview.innerHTML = CombinedArray.join(" <br> ");
        console.log("inner html set");  
         
    }
})
})