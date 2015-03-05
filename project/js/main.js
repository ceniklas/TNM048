// KOMMUNKODER! - http://skl.se/tjanster/kommunerlandsting/faktakommunerochlandsting/kommunkoder.2052.html

var countryData;
var dataSet = [];
var map, chart;

var dataLoaded = function() {
	console.log("Data loaded, calling constructors...");
	
	map = new map();
	chart = new chart();
};

loadData(dataSet, dataLoaded);

function loadData(dataSet, callback){	


	var setsToLoad = 2;

	var thingLoaded = function() {
		setsToLoad--;
		console.log("----",setsToLoad);
		if(setsToLoad == 0){
			console.log("Callbacking!");
			callback();
		}
	}

	//Do stuff and load data.
	d3.csv("data/Swedish_Population_Statistics_v2.csv", function(data) {
			
		for(var i=0; i<data.length; i++){
			dataSet.push(data[i]);
		}
		//dataSet = (data);

		var test1country = (dataSet[19]["region"]).split(" ")[1];
		console.log(test1country);

		console.log(1);
        thingLoaded();
    });

	d3.json("data/swe_mun.json", function(error, sweden) {
        countryData = sweden["objects"]["swe_mun"]["geometries"];

        console.log(2);
        thingLoaded();
        //draw(countries);
        
    });
}

function getKommunData(value){
	return [dataSet[32], dataSet[33], dataSet[34], dataSet[35], dataSet[36], dataSet[37], dataSet[38], dataSet[39]];
}

function printFunneyStuff(value){
	
	for(var i=0; i<dataSet.length; i++){

		if(value == (dataSet[i]["region"]).split(" ")[1]){// || (dataSet[i]["region"]).split(" ")[0] == 2523){ //Gällivare = 2523
			console.log(dataSet[i]);
		}
	}

	//console.log(countryData[value].properties.name);
}