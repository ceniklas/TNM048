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
			console.log(data[temp]);
			
			centroids[i] = data[temp];
		}

		console.log(centroids);
        
		//2.
		//Assign each item to the cluster that has the closest centroid. There are several ways of calculating
		//distances and in this lab we will use the Euclidean distance
		var minDistanceArray = new Array(data.length);
		var minDistanceArray = new Array(data.length);
		var distance = [];
		data.forEach(function(d, index){
			
			

			for(i = 0; i<k; i++){
				distance[k] =
				Math.pow(Number(d['A'])
				- Number(centroids[i]['A']),2)
				+ Math.pow(Number(d['B'])
				- Number(centroids[i]['B']),2)
				+ Math.pow(Number(d['C'])
				- Number(centroids[i]['C']),2);
				
				if(k > 3){
					distance[k] += Math.pow(Number(d['D'])	- Number(centroids[i]['D']),2) + Math.pow(Number(d['F']) - Number(centroids[i]['F']),2); 
				}
				
				distance[k] = Math.sqrt(distance[k]);
			

			for(j=0; j<distance.length; j++){
				if(j == 0){
					minDistanceArray[i] = distance[k];
				}
				else if(distance[k] < minDistanceArray[i]){
					minDistanceArray[i] = distance[k];
				}
				
					
			}
		}

			
			//3.
			//When all objects have been assigned, recalculate the positions of the K
			//centroids to be in the
			//centre of the cluster. This is achieved by calculating the average values in all dimensions.
			
		})
		
		

		//3. 
		//When all objects have been assigned, recalculate the positions of the K centroids to be in the
		//centre of the cluster. This is achieved by calculating the average values in all dimensions
		data.forEach(function(d, index){




		});

		console.log("DONE");


    };
	
    
    