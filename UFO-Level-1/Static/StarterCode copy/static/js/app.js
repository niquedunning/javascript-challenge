var Data = data

// from data.js

var tbody = d3.select("tbody")


function dataShow(item){
    tbody.text("");
    item.forEach(ufo => {
        console.table(ufo);
        add_tr = tbody.append("tr");

        Object.entries(ufo).forEach(function([key,value]){
            add_td = add_tr.append("td").text(value);
        });
    });
}

dataShow(Data)
console.log("Second Step")

var Button = d3.select("#filter-btn")
Button.on("click", function(){
    console.log("Step 3")

d3.event.preventDefault();

var dateInput = d3.select("#datetime");
var dateValue = dateInput.property("value");

var cityInput = d3.select("#city");
var cityValue = cityInput.property("value");

var stateInput = d3.select("#state");
var stateValue = stateInput.property("value");

var countryInput = d3.select("#country");
var countryValue = countryInput.property("value");

var shapeInput = d3.select("#shape");
var shapeValue = shapeInput.property("value");


console.log(dateValue);
console.log(cityValue);
console.log(stateValue);
console.log(countryValue);
console.log(shapeValue);

var Filter = Data.filter(ufo =>{
    return(ufo.datetime===dateValue || !dateValue) &&
              (ufo.city===cityValue || !cityValue) &&
              (ufo.state===stateValue || !stateValue) &&
              (ufo.country===countryValue || !countryValue) &&
              (ufo.shape===shapeValue || !shapeValue )
})

dataDisplay(Filter);

});