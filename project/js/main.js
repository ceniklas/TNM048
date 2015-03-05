// KOMMUNKODER! - http://skl.se/tjanster/kommunerlandsting/faktakommunerochlandsting/kommunkoder.2052.html

var countryData;
var dataSet = [];
var map, chart;

var dataLoaded = function() {

	checkDataIntegrity();

	map = new map();
	console.log("Creating chart");
	chart = new chart();
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
	return [dataSet[32], dataSet[33], dataSet[34], dataSet[35], dataSet[36], dataSet[37], dataSet[38], dataSet[39]];
}

function checkDataIntegrity(){
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