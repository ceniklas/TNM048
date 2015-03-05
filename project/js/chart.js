function chart(){
	/*
	var w = 300;
	var h = 300;
	var r = h/2;*/
	var color = d3.scale.category20c();
	
	var chartDiv = $("#chart");
	
	var margin = {top: 40, right: 20, bottom: 40, left: 20},
        width = chartDiv.width() - margin.right - margin.left,
        height = chartDiv.height() - margin.top - margin.bottom;
		
	var r = height/2;

	/*var data = [{"label":"Single", "value":80}, 
				{"label":"Divorced", "value":15}, 
				{"label":"Widowed", "value":5}];*/

	function drawChart()
	{
		
	}
				
	var vis = d3.select('#chart').append("svg:svg")
		.data([data])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + r + "," + r + ")");
		
	var pie = d3.layout.pie().value(function(d){return d.value;});

	// declare an arc generator function
	var arc = d3.svg.arc().outerRadius(r);

	// select paths, use arc generator to draw
	var arcs = vis.selectAll("g.slice")
		.data(pie)
		.enter()
		.append("svg:g")
		.attr("class", "slice");
		
	arcs.append("svg:path")
		.attr("fill", function(d, i){
			return color(i);
		})
		.attr("d", function (d) {
			// log the result of the arc generator to show how cool it is :)
			console.log(arc(d));
			return arc(d);
		});

	// add the text
	arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
		return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
		return data[i].label;}
			);
}
