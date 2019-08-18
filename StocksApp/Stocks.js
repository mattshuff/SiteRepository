var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=0P0000KM22.L&interval=1min&apikey=DET6IF6YAHK5PGVO';
var Data;

jQuery.ajax({
    url: url,
    dataType: 'json',
    contentType: "application/json",
    success: function (data) {
        Data = data;
    }
})

var p = document.getElementById("test");
p.innerHTML = Data;