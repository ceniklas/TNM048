var yearSelected = 2012;
var swedenMapData;
var colorscale;

function setColorscale(){
    
    var swe = g.selectAll(".country").data(swedenMapData);

    swe.style("fill", function(d){
        var tjej = parseFloat(getKommunData(d.properties.name)[1][yearSelected]);
        var kille = parseFloat(getKommunData(d.properties.name)[0][yearSelected]);
        var num = (tjej - kille)/(tjej + kille);
        return colorscale(num); 
    });
}

function map(){

	//var self = this;

    var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var width = mapDiv.width() - margin.right - margin.left;
    var height = mapDiv.height() - margin.top - margin.bottom;

    colorscale = d3.scale.linear().domain([minDomain, maxDomain]).range(["white","green"]);
	
    var projection = d3.geo.mercator().center([30, 65]).scale(1000);

    var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).call(zoom);

    var path = d3.geo.path().projection(projection);
	
    g = svg.append("g");

    // load data and draw the map
    d3.json("data/swe_mun.json", function(error, sweden) {
        swedenMapData = topojson.feature(sweden, sweden.objects.swe_mun).features;

        draw();
    });

    function draw()
    {
        var country = g.selectAll(".country").data(swedenMapData);
		
		var counter = 0;
        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) {return d.properties.name; })
			/*.style("fill", function(d){
				var tjej = parseFloat(getKommunData(d.properties.name)[1][yearSelected]);
				var kille = parseFloat(getKommunData(d.properties.name)[0][yearSelected]);
				var num = (tjej - kille)/(tjej + kille);
				return colorscale(num); 
            })*/ 
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

            setColorscale();

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


        kommunSelected = value;
        //printFunneyStuff(value);
		drawChart();

		//drawChart(getKommunData(value));

		//chart.drawChart(getKommunData(value));
    }
}
