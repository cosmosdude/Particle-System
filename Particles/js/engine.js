/*
	@file: engine.js
	@author: Thwin Htoo Aung
	
	This file includes engine code necessary to provide fps based partical system and manipulation.
	Note that you only get '16.67ms' for '60fps' and '33.33ms' for '30fps' to do your all your biddings.
	Other fps are alike.
*/

var PEngine = {
	particalPool: null,
	
	fps: 30,
	
	drawnFrame: 0,
	
	resetDrawnFrameDebug: function() {
		PEngine.drawnFrame = 0;	
	},
	
	// time required to travel
	particalTravelTimeInSecond: 10,
	
	initializeParticalPool: function( capacity ) {
		PEngine.particalPool = ParticalPool({capacity: capacity});	
		
		for (var i = 0 ; i < capacity ; i += 1) {
			PEngine.tryToAssignNewPartical();
		}
		
	},
	
	getRandomizedPartical: function() {
		var partical = Partical();
		
		partical.start.x = Utility.randomizeBetween({min: 0, max: window.innerWidth});
		partical.start.y = Utility.randomizeBetween({min: 0, max: window.innerHeight});
		
		partical.end.x = Utility.randomizeBetween({min: 0, max: window.innerWidth});
		partical.end.y = Utility.randomizeBetween({min: 0, max: window.innerHeight});
		
		partical.frame.x = partical.start.x;
		partical.frame.y = partical.start.y;
		
		partical.distance = {
			x: partical.end.x - partical.start.x,
			y: partical.end.y - partical.start.y
		};
		
		partical.velocity = {
			x: (partical.distance.x / PEngine.particalTravelTimeInSecond) / PEngine.fps,
			y: (partical.distance.y / PEngine.particalTravelTimeInSecond) / PEngine.fps
		}
		
		return partical;
	},
	
	tryToAssignNewPartical: function() {
		if (PEngine.particalPool != null) {
			var randomizedPartical = PEngine.getRandomizedPartical();
//			console.log(randomizedPartical.frame);
			PEngine.particalPool.add( randomizedPartical );
		}
	},
	
	// number of time required to call the callback
	requiredCallbackCount: 3,
	
	
	fixedUpdate: function() {
		
		PEngine.drawnFrame += 1;
		
		if (PEngine.particalPool != null) {
//			console.log('looping through particals');
			if (PEngine.fixedCallback != null) {
	
				// will loop the loop until the requiredCallbackCount is met
				for (var ii = 0; ii < PEngine.requiredCallbackCount; ii += 1) {
					
//					for (var i = 0 ; i < PEngine.particalPool.capacity; i += 1) {
						PEngine.fixedCallback( {
							// currently exposing partical
//							currentPartical: PEngine.particalPool.particals[i],
							
							// currently running partical pool
							currentPool: PEngine.particalPool,
							
							// currently using index
//							currentIndex: i,
							
							// currently running callback count
							currentSequence: ii
						} );
						
//						console.log(ii);
//					}
				}
	
//				console.log(ii);
			}
		}
	},
	
	fixedCallback: function() { },
	
	fpsToken : null,
	
	bindFPS: function() {
		if (PEngine.fpsToken == null) {
			PEngine.fpsToken = setInterval(PEngine.fixedUpdate, (1 * 1000) / PEngine.fps);	
		} else {
			console.log('Trying to rebind fps drawing of engine without releasing it\'s prior state.');
		}
	},
	
	unbindFPS: function() {
		clearInterval(PEngine.fpsToken);
		
		PEngine.fpsToken = null;
	}
};



