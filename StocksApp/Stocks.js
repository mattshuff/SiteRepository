var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=0P0000KM22.L&interval=1min&apikey=DET6IF6YAHK5PGVO';
var FetchedJSON = "";

jQuery.ajax({
    url: url,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {
        FetchedJSON = data;

        var label = "Time Series (Daily)";
        var timeData = FetchedJSON[label];

        dates = [];
        values = [];

        console.log(timeData);

        //iterate through our data, get dates and closing values
        for (const key of Object.keys(timeData)) {
            //this add the time to our dates
            dates.push(key);
            //this add the closing values to our values array
            values.push(timeData[key]["4. close"]);
        }

        console.log(Object.keys(timeData)[0][0][0]);
    }
})