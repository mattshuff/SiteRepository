var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=0P0000KM22.L&interval=1min&apikey=DET6IF6YAHK5PGVO';

$.ajax({
    url: url,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {

        //select the daily data
        var label = "Time Series (Daily)";
        var timeData = data[label];

        //arrays to be logged to
        dates = [];
        values = [];

        console.log(timeData);

        //iterate through our data, get dates and closing values
        for (const date of Object.keys(timeData)) { 

            dates.push(date);
            values.push(timeData[date]["4. close"]);
        }
        var combined = [];
        var i;
        for(i=0;i<dates.length;i++){
            combined.push(dates[i] + " - " + values[i]);
        }
        var fivedayview = document.getElementById("FiveDayView");
        fivedayview.innerHTML = combined;
        

        
    }
})