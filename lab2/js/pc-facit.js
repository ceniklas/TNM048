function pc(){

    var self = this; // for internal d3 functions

    var pcDiv = $("#pc");

    var margin = [30, 10, 10, 10],
        width = pcDiv.width() - margin[1] - margin[3],
        height = pcDiv.height() - margin[0] - margin[2];

    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
        

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;

    var svg = d3.select("#pc").append("svg:svg")
        .attr("width", width + margin[1] + margin[3])
        .attr("height", height + margin[0] + margin[2])
        .append("svg:g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    
    d3.csv("data/testData2_5600x5_x-clusters.csv", function(data) {
        // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
            return (y[d] = d3.scale.linear()
                .domain(d3.extent(data, function(p) { return +p[d]; }))
        
                //assign the the axis scale  between [0 1]
                //...
        
                .range([height, 0])
                ); 
        }));
        
        self.data = data;
        
        var k = 4;
        var kmeansRes = kmeans(data,k);
        //console.log( kmeansRes);
        
		//initialize the cluster colors
        //Color code the clusters, based on number of clusters
		
		var color = ['rgb(255,255,153)','rgb(127,201,127)','rgb(190,174,212)','rgb(253,192,134)','rgb(22,115,143)','rgb(156,15,30)'];
		/*var colorArray = new Array(k);
		var color = d3.scale.category20b();
		for(var i=0; i<k; i++)
		{
			//assign color to resp cluster
			//store color in array
			
			colorArray[i] =  color(i+Math.floor(Math.random()*20)); //+Math.floor(Math.random()*20)
			//console.log("Color = " + color(i));
		}
		//console.log("colorArray length 1 " + colorArray.length );
		
		var ccArray = new Array(kmeansRes.length);
		//console.log("ccArray length 1 " +ccArray.length);
		
		for(var j=0; j<(kmeansRes.length); j++)
		{
			//console.log("inne i forloop 1 med length kmeansres");
			for(var i=0; i<k; i++)
			{
				//console.log("inne i forloop 2 med length k");
				if(kmeansRes[j] == i )
				{
					//console.log("inne i if-satsen woop");
					ccArray[j] = colorArray[i];
				}
			}
		}*/
		
		//all lengths
		//console.log("kmeansRes length 2 " + kmeansRes.length);
		//console.log("colorArray length 2 " + colorArray.length );
		//console.log("ccArray length 2 " +ccArray.length);
		
		
		//console.log("kmeansRes colors " + kmeansRes);
		
        draw(kmeansRes,color);
    });

    function draw(kmeansRes,color){
        
		//console.log("ccArray length 3 " + ccArray.length);
		//console.log("ccArray colors  " +ccArray);
        // Add grey background lines for context.
        background = svg.append("svg:g")
            .attr("class", "background")
            .selectAll("path")
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path);
                
        // Add blue foreground lines for focus.
        foreground = svg.append("svg:g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path)
            .style("stroke", function(d,i) {  
            //Assign the cluster colors
					//console.log("Nu �r vi inne i smeteeeen");
					
					//console.log("Data " + i +" " + d);
					return color[kmeansRes[i]];//ccArray[i];
					
			});
			/*  */
        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("svg:g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            

        // Add an axis and title.
        g.append("svg:g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            .append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(String);

        // Add and store a brush for each axis.
        g.append("svg:g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        foreground.style("display", function(d) {
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }
   
}
