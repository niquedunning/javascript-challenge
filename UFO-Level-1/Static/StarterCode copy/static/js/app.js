// from data.js
var tableData = data;

var button = d3.select("#filter-button");

// Select the form
var form = d3.select(".form-group");


button.on("click", runEnter);
form.on("submit",runEnter);