var color;

var chartDiv;

var margin, width, height;

var r;

var vis;
var pie;
var arc;
var arcs;
var firstTime;

var data;
var data2;

var year;
	
function chart(){
	/*
	var w = 300;
	var h = 300;
	var r = h/2;*/

	color = d3.scale.category20c();
	
	chartDiv = $("#chart");
	
	margin = {top: 40, right: 20, bottom: 40, left: 20};
	width = chartDiv.width() - margin.right - margin.left;
	height = chartDiv.height() - margin.top - margin.bottom;
	
	//width = 300;
	//height = 300;
	r = height/2;

	data = [{"label":"Single", "value":80}, 
				{"label":"Divorced", "value":15}, 
				{"label":"Widowed", "value":5}];
				
	firstTime = true;
}

function drawTheChart(theData){
	
	/*var vis = d3.select('#chart')
		.append("svg:svg")
		.data([data])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + r + "," + r + ")");*/	
	
	data2 = theData;
	
	console.log([data2]);
	//console.log(data);
	
	var pieData1 = [], pieData2 = [];
	year = "2012";
	var sum1 = 0, sum2 = 0;
	
	//select the interesting data at the selected year
	for(var i = 0; i<data2.length; i+=2){
		
		pieData1.push({"label":data2[i]["marital status"], "value":parseFloat(data2[i][year])});
		sum1 += parseFloat(data2[i][year]);
	}
	
	for(var i = 1; i<data2.length; i+=2){
		
		pieData2.push({"label":data2[i]["marital status"], "value":parseFloat(data2[i][year])});
		sum2 += parseFloat(data2[i][year]);
	}
	
	initiateData(pieData1, sum1);
	initiateData(pieData2, sum2);
	
	if(firstTime == true){
		firstTime = false;
	}
}

function initiateData(pieData, sum){

	console.log(sum);
	console.log(pieData);
	
	//insert the selected data
	//vis.exit().remove();
	
	vis = d3.select('#chart')
		.append("svg:svg")
		.data([pieData])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + r + "," + r + ")");
	
	// declare an arc generator function
	arc = d3.svg.arc().outerRadius(r);
	
	pie = d3.layout.pie().value(function(d){ return d.value; });
	
	//if(firstTime == true){ //kanske dåligt sätt att göra detta?..
		
		// select paths, use arc generator to draw
		arcs = vis.selectAll("g.slice") 
			.data(pie)
			.enter()
			.append("svg:g")
			.attr("class", "slice");
	/*}
	else{
		
	arcs = vis.selectAll("g.slice") 
	    .data(pie) // set the new data
	    .attr("class", "slice");
	}*/
	
	arcs.append("svg:path")
		.attr("fill", function(d, j){
			return color(j);
		})
		.attr("d", arc);
	
	// add the text
	arcs.append("svg:text")
	.attr("transform", function(d){
		d.innerRadius = r/1.5;
		d.outerRadius = r*2;
		return "translate(" + arc.centroid(d) + ")";})
	.attr("text-anchor", "middle").text( function(d, j){ return pieData[j].label; } );
	
	// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
      .attr("transform", function(d) { //set the label's origin to the center of the arc
		//we have to make sure to set these before calling arc.centroid
		d.outerRadius = r; // Set Outer Coordinate
		d.innerRadius = 0; // Set Inner Coordinate
		return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
      })
      .style("fill", "White")
      .style("font", "bold 12px Arial")
      .text(function(d, j) { return  Math.floor(100 * (parseFloat(d["value"]) / parseFloat(sum))) + "%"; });
	  
	  function angle(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    }
}
