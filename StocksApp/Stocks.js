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

        //draw data to graph
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "test graph"
            },
            axisX:{
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Closing Price (in USD)",
                includeZero: false,
                valueFormatString: "$##0.00",
            },
            data: [{
                type: "area",
                xValueFormatString: "DD MMM",
                yValueFormatString: "$##0.00",
                dataPoints: [
                    { x: dates[0], y: values[0] },
                    { x: new Date(2016, 07, 01), y: 76.727997 },
                
                ]
            }]
        });
        chart.render();

        
    }
})