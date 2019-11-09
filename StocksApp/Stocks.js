//wait until the page is ready
$(document).ready(function () {


})

function AddTracker(symbol) {
    //select the section we need 
    var ContentWrapper = document.getElementById("Content");

    //create a div to contain the data
    var Tracker = document.createElement("div");
    Tracker.setAttribute("ID", "Tracker");

    //create a title 
    var para = document.createElement("p");
    var node = document.createTextNode(symbol);
    para.appendChild(node);
    para.setAttribute("ID", "HistoryP");
    Tracker.append(para);

    //five day history 
    var FiveDayHistoryWrapper = document.createElement("div");
    FiveDayHistoryWrapper.setAttribute("ID", "HistoryWrapper");

    //five month history 
    var FiveMonthHistoryWrapper = document.createElement("div");
    FiveMonthHistoryWrapper.setAttribute("ID", "HistoryWrapper");

    //pull data from database 
    var FiveDayData = "test five ";
    var FiveMonthData = "test five two";

    //append data to boxes 
    Tracker.append(FiveDayHistoryWrapper);
    Tracker.append(FiveMonthHistoryWrapper);

    //append to main screen 
    ContentWrapper.append(Tracker);
}