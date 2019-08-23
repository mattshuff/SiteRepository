//wait until the page is ready
$(document).ready(function() {


    //NEED TO REFACTOR ALL OF THIS INTO A FUNCTION SO THAT YOU IT WILL WORK FOR ANY CALL


    //url of API call, eventually this will be constructed using the Tickers.txt
    var APIurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPY&apikey=DET6IF6YAHK5PGVO';

    //ajax call to fetch the API
    $.ajax({
        url: APIurl,
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
                    para.setAttribute("id", "HistoryP");
                } else {
                    para.setAttribute("style", "color:red;");
                    para.setAttribute("ID", "HistoryP");
                }

                //push elements to array
                Elements.push(para);           
            }

            //correct order of array
            var ReversedElements = Elements.reverse();

            var TrackerDiv = document.createElement('div');
            TrackerDiv.setAttribute("ID","Tracker");

            var FiveDaysDiv = document.createElement('div');
            FiveDaysDiv.setAttribute("ID","HistoryWrapper");


            //append to wrapper 
            var Content = document.getElementById("Content");


            ReversedElements.forEach(function(element) {
                FiveDaysDiv.append(element);
              });
              TrackerDiv.append(FiveDaysDiv);
        }
    })
})

function PopulateData(func,ticker) {

}
