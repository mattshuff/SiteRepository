function TestFunc() {
    $.ajax({
        type: "GET",
        url: '/RefreshStocksData.php',
        data: "",
        async: false,
        dataType: 'html',
        success: function (data) //on recieve of reply
        {
            
        }
    })
}