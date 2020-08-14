//wait until the page is ready
$(document).ready(function () {
    div_hide();
    LoadPreferences();

    //fetch all records 
    var DataString;
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


});

//only runs once but much more readable this way
//decoding from database much more complex than needed as I made this feature before I knew what JSON was - whoops
function DataToHTML(Data) {
    var DataArray = Data;
    var StyleString = " margin-bottom:0px; margin-top:0px;";

    //main content div for the page
    var ContentWrapper = document.getElementById("Content");

    //weird for loop - uses "x++" to move pointer during execution
    for (var x = 0; x < DataArray.length - 1; x++) {

        //parent DIV has "history wrapper" children per stock 
        var StockDataBlock = document.createElement("div");
        StockDataBlock.setAttribute("ID", "HistoryWrapper");

        //write name to wrapper
        var StockNameP = document.createElement("p");
        StockNameP.innerText = DataArray[x]; x++;
        StockNameP.setAttribute("class","StockName");
        StockDataBlock.appendChild(StockNameP);

        //#region Five Day
        //five day data title 
        var TempP = document.createElement("p");
        TempP.innerText = "Previous 5 days";
        TempP.style = StyleString;
        StockDataBlock.appendChild(TempP);

        //convert data string to array, move pointer and trim empty record
        var FiveDayData = DataArray[x]; x++;
        var FiveDayDataArray = FiveDayData.split("!").slice(0, 6);

        var Dates = []; //formatted date value
        var Values = []; //formatted values 

        //push values to above arrays
        for (var y = 0; y < 5; y++) {
            Dates.push(FiveDayDataArray[y].substr(0, 11));
            Values.push(FiveDayDataArray[y].substr(11));
        }

        //create history wrapper and append to page 
        var FiveDayDataDiv = document.createElement("div");
        var Createelementsdiv = CreateElements(Dates, Values);
        FiveDayDataDiv.appendChild(Createelementsdiv);
        StockDataBlock.appendChild(FiveDayDataDiv);
        //#endregion

        //#region Five Month
        //five month subtitle 
        TempP = document.createElement("p");
        TempP.innerText = ("Previous 5 months");
        TempP.style = StyleString;
        StockDataBlock.appendChild(TempP);

        var FiveMonthDataArray = DataArray[x];
        FiveMonthDataArray = FiveMonthDataArray.split("!");
        FiveMonthDataArray = FiveMonthDataArray.slice(0, 6);

        var FiveMonthDates = [];
        var FiveMonthvalues = [];
        for (y = 0; y < 5; y++) {
            FiveMonthDates.push(FiveMonthDataArray[y].substr(0, 11));
            FiveMonthvalues.push(FiveMonthDataArray[y].substr(11));
        }

        StockDataBlock.appendChild(CreateElements(FiveMonthDates, FiveMonthvalues));
        //#endregion

        ContentWrapper.appendChild(StockDataBlock);
    }
}

function CreateElements(Dates, Values) {

    var WrapperDiv = document.createElement('div');
    WrapperDiv.setAttribute('id', "WrapperDiv");
    //loop through every record 

    var TextWrapper = document.createElement("div");
    TextWrapper.setAttribute("id","TextWrapper");
    for (var y = 0; y < Dates.length; y++) {
        var OutputText = "";

        //format dates into proper format
        var CurrentDate = Dates[y].slice(0, Dates[y].length - 1);
        CurrentDate = new Date(Date.parse(CurrentDate));
        CurrentDate = CurrentDate.toLocaleDateString();
        OutputText = OutputText + CurrentDate;

        //format stock value 
        var CurrentValue = Values[y];
        OutputText = OutputText + " " + CurrentValue;


        var FullData = document.createElement('p');
        FullData.innerText = OutputText;

        if (Values[y + 1] > + CurrentValue) {
            FullData.style = "color:red; margin-bottom:0px; margin-top:0px;";
        }
        else {
            FullData.style = "color:#90EE90; margin-bottom:0px; margin-top:0px;";
        }

        TextWrapper.appendChild(FullData);
    }
    WrapperDiv.appendChild(TextWrapper);

    return WrapperDiv;
}

function div_show() {
    document.getElementById('popupform').style.display = "block";
}
function div_hide() {
    document.getElementById('popupform').style.display = "none";
}
function LoadPreferences() {
    var ColourMode = localStorage.ColourMode;
    var body = document.getElementsByTagName('body')[0];
    
    if (ColourMode == "light") {
        body.style.backgroundColor = "seashell";
        body.style.color = "black";
    }
    else {
        body.style.backgroundColor = "#2C2F33";
        body.style.color = "antiquewhite";


    }
}
function SearchEndpoint(){
var SymbolText = document.getElementById("InputBox").value;

var Response;
$.ajax({
    type: "GET",
    url: 'SymbolLookup.php',
    data : {
        Symbol : SymbolText // will be accessible in $_POST['Symbol']
      },
    async: false,
    dataType: 'html',
    success: function (data) //on recieve of reply
    {
        Response = data;            
    }
});
//parse response to json and scope into array of results
Response =JSON.parse(Response); Response =Response.bestMatches;


//write results to the screen 
//select and clear results div
var SearchResultWrapper = document.getElementById("SearchResults");
SearchResultWrapper.innerHTML = "";

//get symbol and name from results and write to screeen
for(var x = 0; x<Response.length;x++){
    console.log(Response[x]);

    //create text element with name, ticker and style 
    var Heading = document.createElement("p");
    Heading.setAttribute("id","ResultHeading");
    Heading.innerText = Response[x]["1. symbol"] + " - " + Response[x]["2. name"];
    
    
    //function to add new stock 
    Heading.ondblclick = OnclickAddNew;

    //append text to wrapper 
    SearchResultWrapper.appendChild(Heading);
}

//append results to page
var popupform = document.getElementById("popupform");
popupform.appendChild(SearchResultWrapper);

function OnclickAddNew(){

        var TextString = this.innerText;
        var SplitValues = TextString.split(" - ");
        console.log(SplitValues);
        
        //submit new stock 
        $.ajax({
            type: "GET",
            url: 'NewStock.php',
            data : {
                StockName : SplitValues[1],
                StockTicker: SplitValues[0]
            },
            async: false,
            success: function (data) //on recieve of reply
            {
                console.log(data);          
            }
        });
        //reload to see new record
        location.reload();
     }
    }
