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
	
	r = height/2;

	data = [{"label":"Single", "value":80}, 
				{"label":"Divorced", "value":15}, 
				{"label":"Widowed", "value":5}];
}

function drawTheChart(data2){
	
	var vis = d3.select('#chart')
		.append("svg:svg")
		.data([data[0]["2000"],data[1]["2000"],data[2]["2000"]])
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
		d.innerRadius = 0;
		d.outerRadius = r;
		return "translate(" + arc.centroid(d) + ")";})
	.attr("text-anchor", "middle").text( function(d, i){ return data[i].label; } );


	/*

	var width = 960;
    var height = 500;
    var radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(radius - 70);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.population; });

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("data.csv", function(error, data) {

	  data.forEach(function(d) {
	    d.population = +d.population;
	  });

	  var g = svg.selectAll(".arc")
	      .data(pie(data))
	    .enter().append("g")
	      .attr("class", "arc");

	  g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color(d.data.age); });

	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.data.age; });

	});

	*/
}