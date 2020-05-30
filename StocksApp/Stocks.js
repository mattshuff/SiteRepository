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

    DataToHTML(DataArray);

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
function DataToHTML(Data) {
    var DataArray = Data;
    var StyleString = " margin-bottom:0px; margin-top:0px;";

    var ContentWrapper = document.getElementById("Content");

    for (var x = 0; x < DataArray.length - 1; x++) {

        //parent DIV has "history wrapper" children per stock 
        var StockDataBlock = document.createElement("div");
        StockDataBlock.setAttribute("ID", "HistoryWrapper");

        //write stock name to block

        var StockNameP = document.createElement("p");
        StockNameP.innerText= DataArray[x]; x++;
        StockNameP.style = StyleString;
        StockDataBlock.appendChild(StockNameP);

        //#region Five Day
        
        //five day data title 
        var TempP = document.createElement("p");
        TempP.innerText="Five Day Data";
        TempP.style = StyleString;
        StockDataBlock.appendChild(TempP);

        //convert data string to array
        var FiveDayData = DataArray[x]; x++;
        var FiveDayDataArray = FiveDayData.split("&");

        //trim off the empty record
        FiveDayDataArray = FiveDayDataArray.slice(0, 6);

        var Dates=[]; //formatted date value
        var Values=[]; //formatted values 

        //push specific values to array
        for (var y = 0; y < 5; y++) {
            Dates.push(FiveDayDataArray[y].substr(0,11));
            Values.push(FiveDayDataArray[y].substr(11));
        }

        //create history wrapper and append to page 
        var FiveDayDataDiv = document.createElement("div");
        FiveDayDataDiv.appendChild(CreateElements(Dates,Values));
        StockDataBlock.appendChild(FiveDayDataDiv);

        //#endregion

        //#region Five Month

        //five month subtitle 
        TempP = document.createElement("p");
        TempP.innerText=("Five Month"); 
        TempP.style = StyleString;
        StockDataBlock.appendChild(TempP);

        var FiveMonthDataArray = DataArray[x]; x++;
         FiveMonthDataArray = FiveMonthDataArray.split("&");
        FiveMonthDataArray = FiveMonthDataArray.slice(0, 6);

        for ( y = 0; y < 5; y++) {
            Dates.push(FiveMonthDataArray[y].substr(0,11));
            Values.push(FiveMonthDataArray[y].substr(11));
        }
        StockDataBlock.appendChild(CreateElements(Dates,Values));
        //#endregion
        
        ContentWrapper.appendChild(StockDataBlock);
    }
}
//takes an array of P elements and shades them according to if the value is higher or low than the previous 
function CreateElements(Dates,Values){
    
            var WrapperDiv = document.createElement('div');

            var CurrentRecordValue;
            var NextRecordValue;

            //trim date from start
            try { CurrentRecordValue = Elements[y].substr(11); } catch { console.log("test"); }
            try { NextRecordValue = Elements[y + 1].substr(11); } catch { console.log("test"); }

            //append to data div
            var TempDataP = document.createElement("p");
            TempDataP.innerText=Elements[y]; 
            

            //if gained set green
            if (CurrentRecordValue > NextRecordValue) {
                TempDataP.setAttribute("style", "color:#03fc49; margin-bottom:0px; margin-top:0px;");
            }
            //if fell set red
            else {
                TempDataP.setAttribute("style", "color:red; margin-bottom:0px; margin-top:0px;");
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

