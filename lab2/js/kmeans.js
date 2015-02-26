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

		console.log(centroids);
        		
		
		//2.
		//Assign each item to the cluster that has the closest centroid. There are several ways of calculating
		//distances and in this lab we will use the Euclidean distance
		var minDistanceArray = new Array(data.length);
		var closestCentroid = new Array(data.length);
		closestCentroid.fill(Infinity);
		minDistanceArray.fill(Infinity);
		data.forEach(function(d, index){
			
			var distance = new Array(k);	
			

			for(clusterIndex = 0; clusterIndex<k; clusterIndex++){
				distance[clusterIndex] =
				Math.pow(Number(d['A'])
				- Number(centroids[clusterIndex]['A']),2)
				+ Math.pow(Number(d['B'])
				- Number(centroids[clusterIndex]['B']),2)
				+ Math.pow(Number(d['C'])
				- Number(centroids[clusterIndex]['C']),2);
				
				if(k > 3){
					distance[clusterIndex] += Math.pow(Number(d['D'])-Number(centroids[clusterIndex]['D']),2) 
						+ Math.pow(Number(d['F'])-Number(centroids[clusterIndex]['F']),2); 
				}
				
				distance[clusterIndex] = Math.sqrt(distance[clusterIndex]);

			}
			
			//console.log(centroids.length);
			for(clusterIndex=0; clusterIndex<centroids.length; clusterIndex++){
				if(clusterIndex == 0){
					closestCentroid[index] = 0;
					minDistanceArray[index] = distance[clusterIndex];
					//console.log("Assigning first value.");
				}
				else if(distance[clusterIndex] < minDistanceArray[index]){
					//console.log("Better value found to centroid" + clusterIndex);
					closestCentroid[index] = clusterIndex;
					minDistanceArray[index] = distance[clusterIndex];	
				}
			}
			
		});
		
		
		console.log(closestCentroid);
		//3. 
		//When all objects have been assigned, recalculate the positions of the K centroids to be in the
		//centre of the cluster. This is achieved by calculating the average values in all dimensions
		for(clusterIndex = 0; clusterIndex<k; clusterIndex++){
			clusterCounter= 0;
			var x = 0;
			var y = 0;
			var z = 0;
			
			data.forEach(function(d, index){
				if(closestCentroid[index] == clusterIndex){
					console.log(closestCentroid[index]);	
					clusterCounter++;
					//console.log("X " + x + " Y " + y + " Z " + z);
					x+=Number(d['A']) - Number(centroids[clusterIndex]['A']);
					y+=Number(d['B']) - Number(centroids[clusterIndex]['B']);
					z+=Number(d['C']) - Number(centroids[clusterIndex]['C']);
				}	
				
			});
			console.log(clusterCounter);
			
			if(clusterCounter != 0){
				x /= clusterCounter;
				y /= clusterCounter;
				z /= clusterCounter;	
			}

			console.log("X: " + x + " Y: " + y + " Z: " + z);
		}
		
		
		
		
		console.log("DONE");


    };
	
    
    