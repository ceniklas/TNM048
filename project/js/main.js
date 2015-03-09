// KOMMUNKODER! - http://skl.se/tjanster/kommunerlandsting/faktakommunerochlandsting/kommunkoder.2052.html

var countryData;
var dataSet = [];
var map, chart;
var magicVariable;

var dataLoaded = function() {


	checkDataIntegrity();
	calculateMinMaxDomain();

	magicVariable = [dataSet[32], dataSet[33], dataSet[34], dataSet[35], dataSet[36], dataSet[37], dataSet[38], dataSet[39]];

	map = new map();
	chart = new chart();

	createSlider();
};

loadData(dataSet, dataLoaded);

function loadData(dataSet, callback){	

	var setsToLoad = 2;

	var thingLoaded = function() {
		setsToLoad--;
		if(setsToLoad == 0){
			console.log("Data loaded, callbacking!");
			callback();
		}
	}

	//Do stuff and load data.
	d3.csv("data/Swedish_Population_Statistics_v2.csv", function(data) {
			
		for(var i=0; i<data.length; i++){
			dataSet.push(data[i]);
		}

        thingLoaded();
    });

	d3.json("data/swe_mun.json", function(error, sweden) {
        countryData = sweden["objects"]["swe_mun"]["geometries"];

        thingLoaded();
        //draw(countries);
        
    });
}

function getKommunData(value){
	for(var i=0; i<dataSet.length; i+=8){

		if(value == dataSet[i]["region"].substr(5)){
			
			var kommunData = [];

			for(var j=0; j<8; j++){
				kommunData.push(dataSet[i+j]);
			}

			return kommunData;
		}
	}	
}

function drawChart(value){
	drawTheChart(getKommunData(value));
	//drawTheChart([dataSet[32], dataSet[33], dataSet[34], dataSet[35], dataSet[36], dataSet[37], dataSet[38], dataSet[39]]);
}

function createSlider(){

	/*d3.slider().on("slide", function(evt, value) {
  		d3.select('#slider3text').text(value);
	});

	d3.select('#slider3').call(d3.slider().on("slide", function(evt, value) {
    	d3.select('#slider3text').text(value);
    }));*/

    var margin = {top: 20, right: 50, bottom: 20, left: 50},
    width = 750 - margin.left - margin.right,
    height = 50 - margin.bottom - margin.top;

	var x = d3.scale.linear().domain([2000, 2012]).range([0, width]).clamp(true);

	var brush = d3.svg.brush().x(x).extent([0, 10]).on("brush", brushed);

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height / 2 + ")")
		.call(d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(function(d) { return d; })
		.tickSize(0)
		.tickPadding(12))
		.select(".domain")
		.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		.attr("class", "halo");

	var slider = svg.append("g").attr("class", "slider").call(brush);

	slider.selectAll(".extent,.resize").remove();

	slider.select(".background").attr("height", height);

	var handle = slider.append("circle")
	    .attr("class", "handle")
	    .attr("transform", "translate(0," + height / 2 + ")")
	    .attr("r", 9);

	slider.call(brush.event)
		.transition() // gratuitous intro!
		.duration(750)
		.call(brush.extent([70, 70]))
		.call(brush.event);

	function brushed() {
	  var value = brush.extent()[0];

	  if (d3.event.sourceEvent) { // not a programmatic event
	    value = x.invert(d3.mouse(this)[0]);
	    brush.extent([value, value]);
	  }

	  handle.attr("cx", x(value));
	  //d3.select("body").style("background-color", d3.hsl(value, .8, .8));
	  yearSelected = Math.round(value);
	  if(yearSelected > 1999){
	  	setColorscale(yearSelected);
	  }
	}
}

function totalPopulation(){

	var total = 0;
	var tjejer = 0;
	var killar = 0;

	for (var i = 0; i < dataSet.length; i++) {
		total += parseFloat(dataSet[i][2012]);
	};

	for (var i = 6; i < dataSet.length; i+=8) {
		killar += parseFloat(dataSet[i][2012]);
	};

	for (var i = 7; i < dataSet.length; i+=8) {
		tjejer += parseFloat(dataSet[i][2012]);
	};

	return [total, tjejer, killar];
}

var maxDomain = -Infinity;
var minDomain = Infinity;

function calculateMinMaxDomain(){

	for (var i = 1; i < dataSet.length; i+=8) {

		var number = (parseFloat(dataSet[i][yearSelected]) - parseFloat(dataSet[i-1][yearSelected])) / (parseFloat(dataSet[i][yearSelected]) + parseFloat(dataSet[i-1][yearSelected]));

		if(number > maxDomain){
			maxDomain = number;
		}

		if(number < minDomain){
			minDomain = number;
		}
	};

	console.log("MIN="+minDomain);
	console.log("MAX="+maxDomain);
}

function checkDataIntegrity(){

	//console.log("Total:"+totalPopulation()[0] + " Tjejer:" + totalPopulation()[1] + " Killar:" + totalPopulation()[2]);

	console.log("Checking data integrity...");
	for(var k=0; k<countryData.length; k++){
		
		var found = false;
		for(var i=0; i<dataSet.length; i++){

			if(countryData[k].properties.name == dataSet[i]["region"].substr(5)){
				//console.log("Found." + countryData[k].properties.name + " - " + (dataSet[i]["region"]).split(" ")[1]);
				found = true;
				break;
			}
		}

		if(!found){
			console.log("Missing in population statistics: " + countryData[k].properties.name);
		}
		
	}

	for(var k=0; k<dataSet.length; k++){

		var found=false;
		for(var i=0; i<countryData.length; i++) {
			
			if(countryData[i].properties.name == dataSet[k]["region"].substr(5)){
				found = true;
				break;
			}
		}

		if(!found){
			console.log("Missing in map: " + dataSet[k]["region"].substr(5));
		}
	}
	console.log("End of integrity check.");
}