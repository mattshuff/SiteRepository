//wait until the page is ready
$(document).ready(function () {
    div_hide();
    var DataString;

    //fetch all records 
    $.ajax({
        type: "GET",
        url: 'FetchStockData.php',
        data: "",
        async: false,
        dataType: 'html',
        success: function (data) //on recieve of reply
        {
            DataString = data;
        }
    });


    //split returned database value into records, slicing off empty final record 
    var DataArray = DataString.split("^");
    DataArray = DataArray.slice(0, DataArray.length - 1);

    DataToHTML(DataArray, "FiveDay");

    var ContentWrapper = document.getElementById("Content");

    //setup input button 
    var NewStockButton = document.getElementById("AddNew");
    NewStockButton.addEventListener("click", function () {
        div_show();
    });

    //setup escape button
    var EscapeButton = document.getElementById("EscapeInput");
    EscapeButton.addEventListener("click", function () {
        div_hide();
    });

    //setup enter button 
    var SubmitButton = document.getElementById("StockSubmit");
    SubmitButton.addEventListener("click", function () {

        var StockNameValue = document.getElementById("StockName").value;
        var StockTickerValue = document.getElementById("StockTicker").value;

        $.ajax({
            url: "NewStock.php",
            type: 'GET',
            data: {
                StockNamePost: String(StockNameValue),
                StockTickerPost: String(StockTickerValue),
            },
            success: function (data) {
                div_hide();

                document.getElementById("StockName").value = "";
                document.getElementById("StockTicker").value = "";

                location.reload();
            }
        });
    });


    ContentWrapper.addEventListener("dblclick", ClassClick);
});


//only runs once but much more readable this way
function DataToHTML(Data, TimeScale) {
    var DataArray = Data;
    var ContentWrapper = document.getElementById("Content");
    for (var x = 0; x < DataArray.length - 1; x++) {

        //create div for indiviudal stock to keep data grouped and formated 
        var StockDataBlock = document.createElement("div");
        StockDataBlock.setAttribute("ID", "HistoryWrapper");

        //write stock name to block
        var Stockname = DataArray[x]; x++;
        var StockNameP = document.createElement("p");
        var node = document.createTextNode(Stockname); StockNameP.appendChild(node);
        StockNameP.style = " margin-bottom:0px; margin-top:0px; cursor:help;";
        StockNameP.classList.add("StockName");
        StockDataBlock.appendChild(StockNameP);

        // subtitle 
        var TempP = document.createElement("p");
        node = document.createTextNode(TimeScale); TempP.appendChild(node);
        TempP.setAttribute("style", " margin-bottom:0px; margin-top:0px;");
        StockDataBlock.appendChild(TempP);


        var FiveDayData = DataArray[x];
        var FiveDayDataArray = FiveDayData.split("&");

        //trim off the empty record
        FiveDayDataArray = FiveDayDataArray.slice(0, 6);

        //create text elements and add to div 
        var FiveDayDataDiv = document.createElement("div");
        for (var y = 0; y < 5; y++) {

            //used try catch loops here to block a non critical error from stopping execution
            var CurrentRecord;
            try { CurrentRecord = FiveDayDataArray[y].substr(11); } catch { }
            var NextRecord;
            try { NextRecord = FiveDayDataArray[y + 1].substr(11); } catch { }


            var TempDataP = document.createElement("p");
            node = document.createTextNode(FiveDayDataArray[y]); TempDataP.appendChild(node);

            if (CurrentRecord > NextRecord) {
                TempDataP.setAttribute("style", "color:#03fc49; margin-bottom:0px; margin-top:0px;");
            }
            else {
                TempDataP.setAttribute("style", "color:red; margin-bottom:0px; margin-top:0px;");
            }
            FiveDayDataDiv.appendChild(TempDataP);
        }

        StockDataBlock.appendChild(FiveDayDataDiv);



        // five month subtitle 
        var TempP = document.createElement("p");
        node = document.createTextNode("Five Month"); TempP.appendChild(node);
        TempP.setAttribute("style", " margin-bottom:0px; margin-top:0px;");
        StockDataBlock.appendChild(TempP);

        var FiveMonthDataArray = DataArray[x++];
        var FiveMonthDataArray = FiveMonthDataArray.split("&");
        FiveMonthDataArray = FiveMonthDataArray.slice(0, 6);

        var FiveMonthDataDiv = document.createElement("div");
        for (var y = 0; y < 5; y++) {

            //used try catch loops here to block a non critical error from stopping execution
            var CurrentRecord;
            try { CurrentRecord = FiveMonthDataArray[y].substr(11); } catch { }
            var NextRecord;
            try { NextRecord = FiveMonthDataArray[y + 1].substr(11); } catch { }


            var TempDataP = document.createElement("p");
            node = document.createTextNode(FiveMonthDataArray[y]); TempDataP.appendChild(node);

            if (CurrentRecord > NextRecord) {
                TempDataP.setAttribute("style", "color:#03fc49; margin-bottom:0px; margin-top:0px;");
            }
            else {
                TempDataP.setAttribute("style", "color:red; margin-bottom:0px; margin-top:0px;");
            }
            FiveMonthDataDiv.appendChild(TempDataP);
        }

        StockDataBlock.appendChild(FiveMonthDataDiv);
        ContentWrapper.appendChild(StockDataBlock);
    }
}

function div_show() {
    document.getElementById('popupform').style.display = "block";
}

function div_hide() {
    document.getElementById('popupform').style.display = "none";
}

function ClassClick(e) {

    var Target = e.originalTarget;
    if (Target.className === "StockName") {

        var StockName = Target.innerText;

        //have a confirmation dialogue here cause its a pain repopulating data
        $.ajax({
            url: "DeleteStock.php",
            type: 'GET',
            data: {
                StockNamePost: String(StockName),

            },
            success: function (data) {
                location.reload();

            }
        });

    }
    e.stopPropagation();
}

