// from data.js
var tableData = data;

// Using d3 to select the table class
var table = d3.select('table');

// Using d3 to select the table body class
var tbody = d3.select('tbody');


// parsing through data and appending each row of data to <tr> tag
function buildTable(data) {
    
    data.forEach((ufo) => {

    var row = tbody.append("tr");

    // Use Object entries to log each entry to the console
    Object.entries(ufo).forEach(([key, value]) => {
       var cell = row.append("td").text(value);
    });
})};
// call data table function
buildTable(tableData);

var dropdown = d3.select('#dropdown');
dropdown.on('click', function() {
    
    // Select dropdown ID
    var dropdownoptions = d3.select('#dropdown').node().value;
    //Select criteria ID and start it blank
    d3.select('#criteria').node().value = '';
    //Use switch function to determine the avilable criteria and determine their place holders
    switch(dropdownoptions) {
        case 'date':
            place = '1/11/2010';
            break;

        case 'city':
            place = 'Benton';
            break;

        case 'state':
            place = 'Ca';
            break;
        
        case 'country':
            place = 'US';
            break;
        
        case 'shape':
            place = 'Circle';
            break;
        
        case 'selection':
            place = '';
            break;
    }
    //attach placeholders to each criteria
    d3.select('#criteria').attr('placeholder', place);
    //Create a label for dropdown options
    d3.select('label').attr('for',dropdownoptions).text(`Enter a value for ${dropdownoptions}: `);

})

// Select the button for form
var button = d3.select('button');


// Select the form
var form = d3.select('form');

// Create event handler 
button.on("click", runEnter);

//event handler function for form
function runEnter() {
    
    // Prevent page refresh
    d3.event.preventDefault();
    
    // Select the dropdown ID 
    var dropdownoptions = d3.select('#dropdown').node().value;

    //Create Input return
    var inputElement = d3.select("#criteria");
  
    // grab the value property for input
    var inputValue = inputElement.property("value").toLowerCase();
   
    //create conditional function for each criteria
    function ufofilter(ufo){
        if (dropdownoptions === 'date' && ufo.datetime === inputValue){
            return ufo.datetime;
        } else if (dropdownoptions === 'city' && ufo.city === inputValue){
            return ufo.city;
        } else if (dropdownoptions === 'state' && ufo.state === inputValue){
            return ufo.state;
        } else if (dropdownoptions === 'country' && ufo.country === inputValue){
            return ufo.country;
        } else if (dropdownoptions === 'shape' && ufo.shape === inputValue){
            return ufo.shape;
        }
    }
    //create var for the filtered data
    var filteredData = tableData.filter(ufofilter);

    // clearing out all table rows
    tbody.html('');

    // append filtered data to the table
    buildTable(filteredData);
}