var color1;
var color2;

var chartDiv;

var margin, width, height;
var r;

var vis1, vis2;
var pie1, pie2;
var arc;
var arcs1, arcs2;
var firstTime;

var data;
var data2;

var kommunSelected;
	
function chart(){
	color1 = d3.scale.category20c();
	
	chartDiv = $("#chart");
	
	margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = chartDiv.width() - margin.right - margin.left;
	height = chartDiv.height() - margin.top - margin.bottom;
	console.log("W:"+width, "H:"+height);
	
	//width = 300;
	//height = 300;
	r = height/3;

	data = [{"label":"Single", "value":80}, 
				{"label":"Divorced", "value":15}, 
				{"label":"Widowed", "value":5}];
				
	firstTime = true;
}

function drawTheChart(theData){

	data2 = theData;
	
	//console.log([data2]);
	//console.log(data);
	
	var pieData1 = [], pieData2 = [];
	var sum1 = 0, sum2 = 0;
	
	//select the interesting data at the selected year
	for(var i = 0; i<data2.length; i+=2){
		
		pieData1.push({"label":data2[i]["marital status"], "value":parseFloat(data2[i][yearSelected])});
		sum1 += parseFloat(data2[i][yearSelected]);
	}
	
	for(var i = 1; i<data2.length; i+=2){
		
		pieData2.push({"label":data2[i]["marital status"], "value":parseFloat(data2[i][yearSelected])});
		sum2 += parseFloat(data2[i][yearSelected]);
	}
	
	updateDataMale(pieData1, sum1);
	updateDataFemale(pieData2, sum2);
	
	/*if(firstTime == true){
		
		initiateData(pieData1, sum1);
		initiateData(pieData2, sum2);
		
		firstTime = false;
	}
	else{
		
		updateData(pieData1, sum1);
		updateData(pieData2, sum2);
	}*/
}

function updateDataMale(pieData, sum){
	
	if(firstTime == false){
		
		vis1.remove();
		//pie1.remove();
		arcs1.remove();
		
		d3.select('#chart').select("svg").remove();
		//chartDiv.remove();
	}
	
	//insert the selected data
	vis1 = d3.select('#chart')
	.append("svg:svg")
	.data([pieData])
	.attr("width", width)
	.attr("height", height)
	.append("svg:g")
	.attr("transform", "translate(" + r + "," + r + ")");
	
	// declare an arc generator function
	arc = d3.svg.arc().outerRadius(r);
	
	pie1 = d3.layout.pie().value(function(d){ return d.value; });
	
	// select paths, use arc generator to draw
	arcs1 = vis1.selectAll("g.slice")
		.data(pie1)
		.enter()
		.append("svg:g")
		.attr("class", "slice");
	
		arcs1.append("svg:path")
	.attr("fill", function(d, j){
		return color1(j);
	})
	.attr("d", arc);
	
	// add the text
	arcs1.append("svg:text")
	.attr("transform", function(d){
		d.innerRadius = r/1.5;
		d.outerRadius = r*2;
		return "translate(" + arc.centroid(d) + ")";})
	.attr("text-anchor", "middle").text( function(d, j){ return pieData[j].label; } );
	
	// Add a magnitude value to the larger arcs1, translated to the arc centroid and rotated.
    arcs1.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
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

function updateDataFemale(pieData, sum){
	
	if(firstTime == false){
		vis2.remove();
		//pie2.remove();
		arcs2.remove();
		d3.select('#chart').select("svg").remove();
	}
	else{
		firstTime = false;
	}
	
	//insert the selected data
	vis2 = d3.select('#chart')
	.append("svg:svg")
	.data([pieData])
	.attr("width", width)
	.attr("height", height)
	.append("svg:g")
	.attr("transform", "translate(" + r + "," + r + ")");

	// declare an arc generator function
	arc = d3.svg.arc().outerRadius(r);
	
	pie2 = d3.layout.pie().value(function(d){ return d.value; });
	
	// select paths, use arc generator to draw
	arcs2 = vis2.selectAll("g.slice")
		.data(pie2)
		.enter()
		.append("svg:g")
		.attr("class", "slice");
		
		arcs2.append("svg:path")
	.attr("fill", function(d, j){
		return color1(j+4);
	})
	.attr("d", arc);
	
	// add the text
	arcs2.append("svg:text")
	.attr("transform", function(d){
		d.innerRadius = r/1.5;
		d.outerRadius = r*2;
		return "translate(" + arc.centroid(d) + ")";})
	.attr("text-anchor", "middle").text( function(d, j){ return pieData[j].label; } );
	
	// Add a magnitude value to the larger arcs2, translated to the arc centroid and rotated.
    arcs2.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
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