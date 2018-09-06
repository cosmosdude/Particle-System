/*
	@file: partical-handler.js
	@author: Thwin Htoo Aung
	
	This file includes code easing the handling of partical retaining and releasing in array structure.
	
*/

// Create a partical pool with given capacity.
//
// In case the partical pool is full or overflow, newly added particals are automatically thrown away.
//
//
// @code var particalPool = ParticalPool({ capacity: <#your desire partical pool capacity#> })
//
// @return ParticalPool
function ParticalPool( parameters ) {
	
	
	var particalPool = {
		
		// partical container
		//
		particals: [],
		
		
		// capacity
		//
		capacity: parameters.capacity,
		
		
		// if partical pool is full, availableIndex will be -1
		//
		availableIndex: 0
	};
	
	
	
	particalPool.particals = new Array(parameters.capacity);
	
	
	
	// initially fill with 0 (zero: default value)
	for (var i = 0 ; i < parameters.capacity; i += 1) {
		particalPool.particals[i] = 0;
	}
	
	
	
	
	// Reindex the available index for future performance gain in new partical addition
	//
	particalPool.reindex = function() {
			
			particalPool.availableIndex = -1;
		
			
			
			for (var i = 0 ; i < particalPool.capacity; i+= 1) {
				
				var currentPartical = particalPool.particals[i];
			
				
				if ( currentPartical == 0) {
					particalPool.availableIndex = i;
					break;
				}
			}
	}
	
	
	
	// Remove a specific partical
	//
	// @param targetPartical Target partical to be removed from partical pool
	//
	particalPool.remove = function( targetPartical ) {
		if (targetPartical.index >= 0 && targetPartical.index < particalPool.capacity) {
			particalPool.particals[ targetPartical.index ] = 0;
			particalPool.reindex();
		}
	}
	
	
	// Will add a new partical to pool if there is any available vacancy
	//
	// @param targetPartical Target partical to be added to the pool
	//
	particalPool.add = function( targetPartical ) {
		
//		console.log(particalPool.availableIndex);
		
		if ( particalPool.availableIndex != -1 ) {
			
			// capture partical at vacancy
			particalPool.particals[ particalPool.availableIndex ] = targetPartical;
			
			// assign partical's own index
			targetPartical.index = particalPool.availableIndex;
			
			// perform reindexing
			particalPool.reindex();
		}
	}
	
	
	
	return particalPool;
}







