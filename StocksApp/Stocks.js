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

    //split returned database value into records
    var DataArray = DataString.split("^");
    DataArray = DataArray.slice(0,DataArray.length-1);
   
    //body section on html
    var ContentWrapper = document.getElementById("Content");
    
    //loop through every record and append to contentwrapper
    for(var x = 0; x<DataArray.length-1;x++){

        //create wrapper for following data 
        var StockDataBlock = document.createElement("div");
        StockDataBlock.setAttribute("ID", "HistoryWrapper");
        

        //write the name of the stock to the top of the datablock
        var StockNameP = document.createElement("p");
        StockNameP.setAttribute("ID", "");

        var Stockname = DataArray[x]; x++;
        var node = document.createTextNode(Stockname);
        StockNameP.appendChild(node);

        StockDataBlock.appendChild(StockNameP);
        
        //create five day data element (with colour coding) and append 
        var FiveDayDiv = document.createElement("div");
        FiveDayDiv.setAttribute("ID", "StockData");

        var FiveDayArray = DataArray[x].split("&");
        FiveDayArray = FiveDayArray.slice(0,5);
        

        for(var y = 0; y < 4; y++){   
            var TempP = document.createElement("p");  
            var node = document.createTextNode(FiveDayArray[y]);
            TempP.appendChild(node);

        if(FiveDayArray[y].substr(11) >= FiveDayArray[y+1].substr(11)){

            //green if higher than previous day
            TempP.setAttribute("style", "color:#03fc49; margin-bottom:5px; margin-top:0px;");
            console.log("green");
        }
        else{
            //red if less than previous 
            TempP.setAttribute("style", "color:red; margin-bottom:5px; margin-top:0px;");
            console.log("red");
        }

        //append 5 day data to tracker block
        FiveDayDiv.appendChild(TempP);      
        }

        var TempP = document.createElement("p");  
        var node = document.createTextNode(" ");
        TempP.appendChild(node);

        FiveDayDiv.setAttribute("ID", "StockData");
        StockDataBlock.appendChild(FiveDayDiv);
        
        x++;

        //create five MONTH data element (with colour coding) and append 
        var FiveMonthDiv = document.createElement("div");
        FiveMonthDiv.setAttribute("ID", "StockData");

        var FiveMonthArray = DataArray[x].split("&");
        FiveMonthArray = FiveMonthArray.slice(0,5);
        
        for(var y = 0; y < 4; y++){   
            var TempP = document.createElement("p");  
            var node = document.createTextNode(FiveMonthArray[y]);
            TempP.appendChild(node);
        if(FiveMonthArray[y] < FiveMonthArray[y+1]){

            //green if higher than previous day
            TempP.setAttribute("style", "color:#03fc49; margin-bottom:5px; margin-top:0px;");
        }
        else{
            //red if less than previous 
            TempP.setAttribute("style", "color:red; margin-bottom:5px; margin-top:0px;");
        }

        //append 5 day data to tracker block
        FiveMonthDiv.appendChild(TempP);      
        }
        

        //append formated data
        FiveMonthDiv.setAttribute("ID", "StockData");
        StockDataBlock.appendChild(FiveMonthDiv);

        //append tracker to page
        ContentWrapper.append(StockDataBlock);
    }
})
