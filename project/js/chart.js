var color;

var chartDiv;

var margin, width, height;

var r;

var data;
	
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
}

function drawTheChart(data2){
	
	/*var vis = d3.select('#chart')
		.append("svg:svg")
		.data([data])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + r + "," + r + ")");*/
		
	console.log([data2]);
	console.log(data);
	
	var pieData = [];
	var year = "2012";
	var sum;
	
	//select the interesting data at the selected year
	for(var i = 0; i<data2.length; i+=2){
		
		pieData.push({"label":data2[i]["marital status"], "value":parseFloat(data2[i][year])});
		sum += parseFloat(data2[i][year]);
	}
	
	console.log(pieData);
	
	//insert the selected data
	var vis = d3.select('#chart')
		.append("svg:svg")
		.data([pieData])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + r + "," + r + ")");
	
	// declare an arc generator function
	var arc = d3.svg.arc().outerRadius(r);
	
	var pie = d3.layout.pie().value(function(d){ return d.value; });

	// select paths, use arc generator to draw  //FUNKAR JUST NU INTE!!!
	var arcs = vis.selectAll("g.slice") 
		.data(pie)
		.enter()
		.append("svg:g")
		.attr("class", "slice");

	arcs.append("svg:path")
		.attr("fill", function(d, i){
			return color(i);
		})
		.attr("d", arc);

	// add the text
	arcs.append("svg:text")
	.attr("transform", function(d){
		d.innerRadius = r/1.4;
		d.outerRadius = r*3;
		return "translate(" + arc.centroid(d) + ")";})
	.attr("text-anchor", "middle").text( function(d, i){ return pieData[i].label; } );
	
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
      .text(function(d, i) { return parseFloat(sum / parseFloat(pieData[i].value)); });
	  
	  function angle(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    }
}
