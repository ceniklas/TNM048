var dataSet = {};
var map, pie;

var dataLoaded = function() {
	map = new map();
}

loadData(dataSet, dataLoaded);

function loadData(dataSet, callback){
	var dataLoaded = false;

	//Do stuff and load data.

	callback();
}