function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    var colorscale = d3.scale.category20();
    
    //initialize tooltip
    var tooltip = d3.select("body").append("div").attr("class", "tooltip");//.style("opacity", 0.3);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/OECD-better-life-index-hi.csv", function(error, data) {
        self.data = data;
        
        //define the domain of the scatter plot axes
        //...
		
		//var d = d3.select(this).data()[1];
		x.domain([0, d3.max(data, function(d) { return d["Life satisfaction"]; })]);
		y.domain([0, d3.max(data, function(d) { return d["Household income"]; })]);
        
        draw();

    });

    function draw()
    {
        
        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6); 	
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")	
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em");
		
		svg.append("text")      // text label for the x axis
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Life Satisfaction");
			
		svg.append("text")      // text label for the y axis
		.attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left +50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Household income");
		
        // Add the scatter dots.
        svg.selectAll(".dot")
            .data(self.data)
            .enter().append("circle")
            .attr("class", "dot")

            //color?
            .style("fill", function(d){return colorscale(d["Country"]);})

            //Define the x and y coordinate data values for the dots
            //...
			
			
			.attr("cx", function(d) {
				return x(d["Life satisfaction"]);
			})
			.attr("cy", function(d) {
				return y(d["Household income"]);
			})
			.attr("r", 5)
			
            //tooltip
            .on("mousemove", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);    
                tooltip.html(d["Country"])
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition().style("opacity", 0);
            })
            .on("click",  function(d) {
                sp1.selectDot(d["Country"]);
                selFeature(d["Country"]);   
            });
			
			
    }

    //method for selecting the dot from other components
    this.selectDot = function(value){
        d3.select("#sp").selectAll(".dot").data(self.data).attr("opacity", "0.3").style("stroke","none").filter(function(d){ return value.indexOf(d["Country"]) != -1; }).attr("opacity", "1.0").style("stroke","red");
    };
    
    //method for selecting features of other components
    function selFeature(value){
        pc1.selectLine(value);
    }

}




