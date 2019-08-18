var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=0787.HK&interval=1min&apikey=AOIAMG3WFZ8LS58W';

jQuery.ajax({
    url: url,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {
        console.log(data);
    }
});