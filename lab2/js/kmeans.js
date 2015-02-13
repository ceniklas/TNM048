    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
		
		var centroids = new Array(k,3);
		
        for(i = 0; i<k; i++){
			
			var temp = Math.floor(Math.random()*data.length());
			
			centroids[i] = data[temp];
		}
        
    };
	
    
    