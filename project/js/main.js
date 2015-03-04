var countryData;
var dataSet = [];
var map, pie;

var dataLoaded = function() {
	console.log("Data loaded, calling constructors...");
	
	map = new map();

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
	d3.csv("data/Swedish_Population_Statistics.csv", function(data) {
			
		for(var i=0; i<data.length; i++){
			dataSet.push(data[i]);
		}
		//dataSet = (data);

		var test1country = (dataSet[9]["region"]).split(" ")[1];
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

function printFunneyStuff(value){
	

	for(var i=0; i<dataSet.length; i+=8){

		if(value == (dataSet[i]["region"]).split(" ")[1]){
			console.log(dataSet[i]);
		}
	}

	//console.log(countryData[value].properties.name);
}