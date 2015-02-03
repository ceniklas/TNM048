function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    //...
    
    //initialize tooltip
    //...

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
		
		
		
		console.log(d3.max(data, function(d) { return d["Life satisfaction"]; }));
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
                //...    
            })
            .on("mouseout", function(d) {
                //...   
            })
            .on("click",  function(d) {
                //...    
            });
			
			
    }

    //method for selecting the dot from other components
    this.selectDot = function(value){
        d3.select("#sp").selectAll(".dot").attr("fill", function(d) { return d["Country"] == value ? "#f00006" : null; } );
    };
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }

}




