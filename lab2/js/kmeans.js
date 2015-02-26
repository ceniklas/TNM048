    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   	var minDistanceArray;
   	var closestCentroid;
   	var dataSet;
   	var numberOfCentroids;
   	var centroids;

    function kmeans(data, k) {

    	dataSet = data;
    	numberOfCentroids = k;
    	centroids = new Array(numberOfCentroids,3);
    	minDistanceArray = new Array(dataSet.length);
		closestCentroid = new Array(dataSet.length);
		
		var totalMovedOffset = Infinity;
		threshold = 0.00000000000001;

		//1.
		//Randomly place K points into the space represented by the items that are being clustered. These
		//points represent the initial cluster centroids.
        createRandomCentroids();
        		
		while(totalMovedOffset > threshold){
			//2.
			//Assign each item to the cluster that has the closest centroid. There are several ways of calculating
			//distances and in this lab we will use the Euclidean distance
			calculateEuclidianDistance();
			
			//console.log(closestCentroid);
			
			//3. 
			//When all objects have been assigned, recalculate the positions of the K centroids to be in the
			//centre of the cluster. This is achieved by calculating the average values in all dimensions
			totalMovedOffset = recalculateCentroidPositions();
			
		}

		console.log("I STAND FOR THE LIGHT!");
		return closestCentroid;
    };


    //-----------FUNCTIONS----------------
    function calculateEuclidianDistance(){

    	closestCentroid.fill(Infinity);
		minDistanceArray.fill(Infinity);
		dataSet.forEach(function(d, index){
			
			var distance = new Array(numberOfCentroids);	
			

			for(clusterIndex = 0; clusterIndex<numberOfCentroids; clusterIndex++){
				distance[clusterIndex] =
				Math.pow(Number(d['A'])
				- Number(centroids[clusterIndex]['A']),2)
				+ Math.pow(Number(d['B'])
				- Number(centroids[clusterIndex]['B']),2)
				+ Math.pow(Number(d['C'])
				- Number(centroids[clusterIndex]['C']),2);
				
				if(numberOfCentroids > 3){
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
    }

    function createRandomCentroids(){

	    for(i = 0; i<numberOfCentroids; i++){
				var temp = Math.floor(Math.random()*dataSet.length);
				centroids[i] = dataSet[temp];
			}
		console.log(centroids);
	}    

	function recalculateCentroidPositions(){

		for(clusterIndex = 0; clusterIndex<numberOfCentroids; clusterIndex++){
			clusterCounter= 0;
			var A_offset = 0;
			var B_offset = 0;
			var C_offset = 0;
			var D_offset = 0;
			var F_offset = 0;
			
			dataSet.forEach(function(d, index){
				if(closestCentroid[index] == clusterIndex){
					//console.log(closestCentroid[index]);	
					clusterCounter++;
					//console.log("X " + A_offset + " Y " + B_offset + " Z " + C_offsetz);
					A_offset += Number(d['A']) - Number(centroids[clusterIndex]['A']);
					B_offset += Number(d['B']) - Number(centroids[clusterIndex]['B']);
					C_offset += Number(d['C']) - Number(centroids[clusterIndex]['C']);

					if(numberOfCentroids > 3){
						D_offset += Number(d['D']) - Number(centroids[clusterIndex]['D']);
						F_offset += Number(d['F']) - Number(centroids[clusterIndex]['F']);
					}
				}	
				
			});
			
			//console.log(clusterCounter);
			
			if(clusterCounter != 0){
				A_offset /= clusterCounter;
				B_offset /= clusterCounter;
				C_offset /= clusterCounter;	

				if(numberOfCentroids > 3){
					D_offset /= clusterCounter;	
					F_offset /= clusterCounter;
				}
			}

			//console.log("X: " + A_offset + " Y: " + B_offset + " Z: " + C_offset);

			centroids[clusterIndex]["A"] = parseFloat(centroids[clusterIndex]["A"]) + A_offset;
			centroids[clusterIndex]["B"] = parseFloat(centroids[clusterIndex]["B"]) + B_offset;
			centroids[clusterIndex]["C"] = parseFloat(centroids[clusterIndex]["C"]) + C_offset;

			if(numberOfCentroids > 3){
				centroids[clusterIndex]["D"] = parseFloat(centroids[clusterIndex]["D"]) + D_offset;
				centroids[clusterIndex]["F"] = parseFloat(centroids[clusterIndex]["F"]) + F_offset;
			}
		}
		
		if(numberOfCentroids > 3){
			return Math.abs(A_offset) + Math.abs(B_offset) + Math.abs(C_offset) + Math.abs(D_offset) + Math.abs(F_offset);
		}

		return Math.abs(A_offset) + Math.abs(B_offset) + Math.abs(C_offset);

		console.log("DONE");
		console.log(centroids);
	}