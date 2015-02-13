    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
		
		//1.
		//Randomly place K points into the space represented by the items that are being clustered. These
		//points represent the initial cluster centroids.
		
		var centroids = new Array(k,3);
		
        for(i = 0; i<k; i++){
			
			var temp = Math.floor(Math.random()*data.length);
			
			centroids[i] = data[temp];
		}
        
		//2.
		//Assign each item to the cluster that has the closest centroid. There are several ways of calculating
		//distances and in this lab we will use the Euclidean distance
		
		data.forEach(function(d, index){
			
			for(i = 0; i<k; i++){
				var temp =
				Math.pow(Number(d['A'])
				- Number(centroids[i]['A']),2)
				+ Math.pow(Number(d['B'])
				- Number(centroids[i]['B']),2)
				+ Math.pow(Number(d['C'])
				- Number(centroids[i]['C']),2)
				//+ Math.pow(Number(d['D'])
				//- Number(centroids[i]['D']),2)
				//+ Math.pow(Number(d['F'])
				//- Number(centroids[i]['F']),2)
				; 
				
				console.log("F: " + Number(centroids[i]['A']));
				
				temp = Math.sqrt(temp);
				
				console.log(temp);	
			
			}
			
		})
		
    };
	
    
    