// from data.js
var tableData = data;

// Using d3 to select the table
var table = d3.select('table');

// Using d3 to select the table body
var tbody = d3.select('tbody');


// Using d3 to append one table row `tr` for each sighting object
function buildTable(data) {
    
    data.forEach((ufo) => {

    var row = tbody.append("tr");

    // Using `Object.entries` to console.log each sighting's value
    Object.entries(ufo).forEach(([key, value]) => {
       var cell = row.append("td").text(value);
    });
})};

buildTable(tableData);

var dropdown = d3.select('#dropdown');
dropdown.on('click', function() {
    
    // Select the dropdown
    var dropdownoptions = d3.select('#dropdown').node().value;

    d3.select('#criteria').node().value = '';

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
    d3.select('#criteria').attr('placeholder', place);
    d3.select('label').attr('for',dropdownoptions).text(`Enter a value for ${dropdownoptions}: `);

})

// Select the button
var button = d3.select('button');
// console.log(button);

// Select the form
var form = d3.select('form');
// console.log(form);

// Create event handler 
button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the dropdown
    var dropdownselection = d3.select('#dropdown').node().value;

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#criteria");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value").toLowerCase();
    // console.log(inputValue);

    function ufofilter(ufo){
        if (dropdownselection === 'date' && ufo.datetime === inputValue){
            return ufo.datetime;
        } else if (dropdownselection === 'city' && ufo.city === inputValue){
            return ufo.city;
        } else if (dropdownselection === 'state' && ufo.state === inputValue){
            return ufo.state;
        } else if (dropdownselection === 'country' && ufo.country === inputValue){
            return ufo.country;
        } else if (dropdownselection === 'shape' && ufo.shape === inputValue){
            return ufo.shape;
        }
    }

    var filteredData = tableData.filter(ufofilter);
    // console.log(filteredData);

    // clearing out all table rows
    tbody.html('');

    // append filtered date to the table
    buildTable(filteredData);
}