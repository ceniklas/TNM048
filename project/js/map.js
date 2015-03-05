function map(){

	//var self = this;

    var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var width = mapDiv.width() - margin.right - margin.left;
    var height = mapDiv.height() - margin.top - margin.bottom;

    var colorscale = d3.scale.category20();

    var projection = d3.geo.mercator().center([15, 65]).scale(1000);

    var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).call(zoom);

    var path = d3.geo.path().projection(projection);
	
    g = svg.append("g");

    // load data and draw the map
    d3.json("data/swe_mun.json", function(error, sweden) {
        var countries = topojson.feature(sweden, sweden.objects.swe_mun).features;

        draw(countries);
    });

    function draw(countries,data)
    {
        var country = g.selectAll(".country").data(countries);

        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            //country color
            //...
			//.style("fill", function(d){return colorscale(d.properties.name)})   //F컴컴컴컴RG!!!
            //tooltip
            .on("mousemove", function(d) {
                //...
            })
            .on("mouseout",  function(d) {
                //...
            })
            //selection
            .on("click",  function(d) {
                selFeature(d.properties.name);
            });
    }

    //zoom and panning method
    function move() {
        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
    }
    
    //method for selecting features of other components
    function selFeature(value){
        var lines = [];
        lines.push( value );
        printFunneyStuff(value);
		drawChart(value);
    }
}
