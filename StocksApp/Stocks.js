//wait until the page is ready
$(document).ready(function () {
    AddTracker("SPY");

})

function AddTracker(symbol) {

    //select the section we need 
    var ContentWrapper = document.getElementById("Content");

    //create a div to contain the data
    var Tracker = document.createElement("div");
    Tracker.setAttribute("ID", "Tracker");

    //append title with the symbol 
    var para = document.createElement("p");
    var node = document.createTextNode(symbol);
    para.appendChild(node);
    para.setAttribute("ID", "HistoryP");
    Tracker.append(para);

    //five day history 
    var FiveDayHistoryWrapper = document.createElement("div");
    FiveDayHistoryWrapper.setAttribute("ID", "HistoryWrapper");

    //HERE WE NEED TO POPULATE THE FIVE DAY HISTORY FROM THE DB
    $.ajax({
        url: 'FetchStockData.php',
        data: "",
        dataType: 'json',
        success: function (data) //on recieve of reply
        {


        }
    })
    Tracker.append(FiveDayHistoryWrapper);













    //five month history 
    var FiveMonthHistoryWrapper = document.createElement("div");
    FiveMonthHistoryWrapper.setAttribute("ID", "HistoryWrapper");

    //HERE WE NEED TO POPULATE THE FIVE MONTH HISTORY
    var FiveMonthData = "test five two";
    Tracker.append(FiveMonthHistoryWrapper);

    //append to main screen 
    ContentWrapper.append(Tracker);
}