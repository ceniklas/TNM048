var dataSet = {};
var map, chart;

var dataLoaded = function() {
	map = new map();
	
	chart = new chart();
	console.log("GONNA LOAD SOME DATA");
}

loadData(dataSet, dataLoaded);

function loadData(dataSet, callback){
	var dataLoaded = false;

	//Do stuff and load data.

	callback();
}