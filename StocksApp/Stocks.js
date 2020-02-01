//wait until the page is ready
$(document).ready(function () {
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
    })

    //split returned database value into records, slicing off empty final record 
    var DataArray = DataString.split("^");
    DataArray = DataArray.slice(0,DataArray.length-1);
    
    //select body section on html
    var ContentWrapper = document.getElementById("Content");

    //loop through every record and append to contentwrapper
    for(var x = 0; x<DataArray.length-1;x++){

        //create div for indiviudal stock to keep data grouped and formated 
        var StockDataBlock = document.createElement("div");
        StockDataBlock.setAttribute("ID", "HistoryWrapper");
        
        //write stock name to block
        var Stockname = DataArray[x]; x++;
        var StockNameP = document.createElement("p");
        var node = document.createTextNode(Stockname); StockNameP.appendChild(node);
        StockDataBlock.appendChild(StockNameP);

        //5 five subtitle 
        var TempP = document.createElement("p");
        var node = document.createTextNode("Five Day:"); TempP.appendChild(node);
        TempP.setAttribute("style", " margin-bottom:5px; margin-top:20px;");  
        StockDataBlock.appendChild(TempP);
       
        //create five day block and fill with colour coded data
        var FiveDayData = DataArray[x]; x++;
        var FiveDayDataArray = FiveDayData.split("&");
        
        //trim off the empty record
        FiveDayDataArray = FiveDayDataArray.slice(0,6);

        //create text elements and add to div 
        var FiveDayDataDiv = document.createElement("div");
            for(var y=0; y<5 ;y++) {
                //trim dates
                var CurrentRecord = FiveDayDataArray[y].substr(11);
                var NextRecord = FiveDayDataArray[y+1].substr(11);

                var TempDataP = document.createElement("p");
                var node = document.createTextNode(FiveDayDataArray[y]); TempDataP.appendChild(node);
                
                if(CurrentRecord>NextRecord) { 
                    TempDataP.setAttribute("style", "color:#03fc49; margin-bottom:5px; margin-top:0px;");                   
                }
                else {
                    TempDataP.setAttribute("style", "color:red; margin-bottom:5px; margin-top:0px;");                                       
                }     
                FiveDayDataDiv.appendChild(TempDataP);       
            }
        StockDataBlock.appendChild(FiveDayDataDiv);

        //repeat above for five months data 
        var FiveMonthData = DataArray[x]; 
        var FiveMonthDataArray = FiveMonthData.split("&");
        FiveMonthDataArray = FiveMonthDataArray.slice(0,6);

        var FiveMonthDataDiv = document.createElement("div");
        for(var y=0; y<5 ;y++) {
            //trim dates
            var CurrentRecord = FiveMonthDataArray[y].substr(11);
            var NextRecord = FiveMonthDataArray[y+1].substr(11);

            var TempDataP = document.createElement("p");
            var node = document.createTextNode(FiveMonthDataArray[y]); TempDataP.appendChild(node);
            
            if(CurrentRecord>NextRecord) { 
                TempDataP.setAttribute("style", "color:#03fc49; margin-bottom:5px; margin-top:0px;");                   
            }
            else {
                TempDataP.setAttribute("style", "color:red; margin-bottom:5px; margin-top:0px;");                                       
            }     
            FiveMonthDataDiv.appendChild(TempDataP);       
        }
        
        var TempP = document.createElement("p");
        var node = document.createTextNode("Five Month:"); TempP.appendChild(node);
        TempP.setAttribute("style", " margin-bottom:5px; margin-top:20px;");  
        StockDataBlock.appendChild(TempP);

        StockDataBlock.appendChild(FiveMonthDataDiv);
        ContentWrapper.appendChild(StockDataBlock);
    }
    
})
