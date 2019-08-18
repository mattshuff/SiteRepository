var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GB00B41XG308&interval=1min&apikey=DET6IF6YAHK5PGVO';

jQuery.ajax({
    url: url,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {
        console.log(data);
    }
});