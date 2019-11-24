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
    var DataArray = DataString.split("--");
    
    //body section on html
    var ContentWrapper = document.getElementById("Content");

    //loop through every record and append to contentwrapper
    for(var x = 0; x<DataArray.length-1;x++){

        //break records down into single data points 
        var SplitData = DataArray[x].split("&");
      
        //remove junk data on end of string (workaround until root issue is found)
        var StockName = SplitData[0].split("-")[0];

        //create a CSS wrapper for a single record
        var Tracker = document.createElement("div");
        Tracker.setAttribute("ID", "Tracker");

        //create a P element for the title and append to wrapper
        var Title = document.createElement("p");
        var node = document.createTextNode(StockName);
        Title.appendChild(node);
        Title.setAttribute("ID", "StockTitle");
        Tracker.append(Title);

        //data goes from index 1-4 WHEN WE UP THIS TO THE FULL FIVE DAYS IT WILL BE 1-5
        var Data = document.createElement("div");
        
        //color code and append data to html elements
        for(var y = 1; y<5;y++){
        
            //element to be added to tracker
        var TempP = document.createElement("p");

        //append content
        var DataString = SplitData[y];
        var node = document.createTextNode(DataString);
        TempP.appendChild(node);

        //color code data
        if(DataString.split(" ")[1] >= SplitData[y+1].split(" ")[1]){

            TempP.setAttribute("style", "color:#03fc49; margin-bottom:5px; margin-top:0px;");
        }
        else{
            TempP.setAttribute("style", "color:red; margin-bottom:5px; margin-top:0px;");
        }

        //append 
        Data.appendChild(TempP);      
        }
        

        //append formated data
        Data.setAttribute("ID", "StockData");
        Tracker.append(Data);

        //append tracker to page
        ContentWrapper.append(Tracker);
    }
})

