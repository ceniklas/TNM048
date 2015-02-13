    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
        //TASK 1
		//1.  Randomly place K points into the space represented by the items that are being clustered. 
		//These points represent the initial cluster centroids
        
		// k = number of clusters, data = data that wants to be clustered
		
		var kPoints = new Array(k,3);
		//console.log("Data length " +data.length);
		
		for(var i=0; i<k; i++)
		{
			//Loopa över antalet k
			index = Math.floor(Math.random()*data.length);
			//console.log(index);
			
			kPoints[i] = data[index];
			//console.log(kPoints[i]);
			//console.log(kPoints[i]['A'],kPoints[i]['B'],kPoints[i]['C']);
		}
		//console.log("Random kPoints " +kPoints);
		var counter = 0;
		
		do{ //Open loop that breaks when centroid centers stop moving 
			
			
			// 2. Assign each item to the cluster that has the closest centroid. 
			// There are several ways of calculating distances and in this lab we
			// will use the Euclidean distance
			
			//Go through all the data, with the power of data, and cluster the objects in array
			
			var cArray = new Array(data.length); //cluster-value array
			
			console.log("counter == " + counter);
			data.forEach(function(d, index) { 
				var min = 100;
				var cluster;
				for(var i=0; i<k; i++) 
				{ 
					//console.log("data[(kPoints[1])]['A'] : " + Number(data[(kPoints[i])]['A'])); 
					//var temp = Number(d['A']) - Number(data[(kPoints[i])]['A']) + Number(d['B']) - Number(data[(kPoints[i])]['B']) + Number(d['C']) - Number(data[(kPoints[i])]['C']); temp = temp*temp; temp = Math.sqrt(temp); 
					var temp = Math.pow(Number(d['A']) - Number(kPoints[i]['A']),2) + Math.pow(Number(d['B']) - Number(kPoints[i]['B']),2) + Math.pow(Number(d['C']) - Number(kPoints[i]['C']),2) + Math.pow(Number(d['D']) - Number(kPoints[i]['D']),2) + Math.pow(Number(d['F']) - Number(kPoints[i]['F']),2); 
					temp = Math.sqrt(temp); 
					if(temp < min) 
					{ 
						min = temp; 
						cluster = i;
					}	 
							
				}
					
				//data tildelas till cluster i
				cArray[index]=cluster;
				//console.log(index, cluster);
			});
			
			// 3. When all objects have been assigned, recalculate the positions of the K centroids to
			//  be in the centre of the cluster. This is achieved by calculating the average values in all dimensions.
				for(var i=0; i<k; i++) 
				{ 
					//console.log("I forloopen wie "); 
					var tempArray = new Array();
					var countK = 0;
					for(var j=0; j<(cArray.length) ; j++)
					{
						if (j==0) {
							tempArray['A'] =0; 
							tempArray['B'] =0;
							tempArray['C'] =0;
							tempArray['D'] =0;
							tempArray['F'] =0;
						}
							
						//console.log("I cArray for loop "); 
						if(cArray[j] == i)
						{
							tempArray['A'] += Number(data[j]['A']); 
							tempArray['B'] += Number(data[j]['B']);
							tempArray['C'] += Number(data[j]['C']);
							tempArray['D'] += Number(data[j]['D']);
							tempArray['F'] += Number(data[j]['F']);
							
							//tempArray.push(data[j]);
							//console.log(tempArray['A']);
							countK++;
						}
						//console.log("I cArray fortf och har värde " + i);
						
					}
					
					kPoints[i]['A'] =tempArray['A']/countK;
					kPoints[i]['B'] = tempArray['B']/countK;
					kPoints[i]['C'] = tempArray['C']/countK;
					kPoints[i]['D'] = tempArray['D']/countK;
					kPoints[i]['F'] = tempArray['F']/countK;
					
					
					//console.log(kPoints[i]['A'],kPoints[i]['B'],kPoints[i]['C']);
				}
			
			// 4.  Check the quality of the cluster. Use the sum of the squared distances within 
			// each cluster as your measure of quality. The objective is to minimize the sum of 
			// squared errors within each cluster:
			// where ||x-c|| is a chosen dist measure between a data point and the cluster 
			// centre , is an indicator of the dist of the n data points from resp clustrcentr
			
			//can you place a for-loop around the data-forEach?
			
			//loopa över data.forEach och sedan summera ihop avståndet för 3 dimensioner
			//alltså i data.forEach loppa över centroiderna, => dubbelsumman av xj-ci
		
					
			var qualityArray = new Array(k);
			
			var newquality=0;
			for(var i=0; i<k; i++){
				qualityArray[i]=0;
			}
			for(var i=0; i<k; i++) 
			{ 
				console.log("I forloopen wie "); 
				var tempArray = new Array();
				for(var j=0; j<(cArray.length) ; j++)
				{
					temp = 0;
					if(cArray[j] == i)
					{
						temp = Math.pow(Number(data[j]['A']) - Number(kPoints[i]['A']),2) + Math.pow(Number(data[j]['B']) - Number(kPoints[i]['B']),2) + Math.pow(Number(data[j]['C']) - Number(kPoints[i]['C']),2) + Math.pow(Number(data[j]['D']) - Number(kPoints[i]['D']),2) + Math.pow(Number(data[j]['F']) - Number(kPoints[i]['F']),2); 
					}
					//console.log("I cArray fortf och har värde " + i);

					qualityArray[i] += temp;
					
				}
				//qualityArray[i] += tempArray['A'] + tempArray['B'] + tempArray['C'];
				
			} 
			for(var i=0; i<k; i++){
				newquality += qualityArray[i];
			}
				
			if (counter > 0) {
				quality = oldquality-newquality;
				console.log("Quality " + quality);
			} else {
				quality = 1;
			} 
				
			
			/*
			console.log("Old Quality " );
			console.log(oldquality);
			console.log("New Quality ");
			console.log(newquality);*/
			//console.log("Quality " + quality);
			
			var thresh = 0.01;
			if(quality <= thresh)
			{
				console.log("breaking while loop bc of min == to thresh (that is 0.01) ");
				return cArray;
				break;
			}
			// else if(quality == 0)
			// {
				// console.log("breaking while loop bc of no improvement");
				// return cArray;
				// break;
			// }
			
			console.log("Number of times the loop have run " + counter);
			oldquality = newquality;
			counter++;
			
					
		}while(counter < data.length);
		
		return cArray;
    };
    
    