//wait until the page is ready
$(document).ready(function () {
    var DataArray;

    $.ajax({
        type: "GET",
        url: 'FetchStockData.php',
        data: "",
        async: false,
        dataType: 'html',
        success: function (data) //on recieve of reply
        {
            DataArray = data;
        }
    })
    console.log(DataArray);

    $.ajax({
        type: "GET",
        url: '/RefreshStocksData.php',
        data: "",
        async: false,
        dataType: 'html',
        success: function (data) //on recieve of reply
        {
            DataArray = data;
        }
    })
    $.ajax({
        type: "GET",
        url: '/RefreshStocksData.php',
        data: "",
        async: false,
        dataType: 'html',
        success: function (data) //on recieve of reply
        {
            DataArray = data;
        }
    })

})