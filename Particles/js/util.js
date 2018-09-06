var Utility = {
	
	// Randomize a number between zero and given range
	//
	// @return randomized float value
	randomizeBetween : function( params ) {
		var randomValue = params.min + ((params.max - params.min) * Math.random());
//		console.log(randomValue);
		return randomValue;
	},
	
	
	// convert degree into radian
	//
	// @return converted radian value
	getRadianFrom: function( param ) {
		return param.degree * (Math.PI / 180);
	},
	
	
	// convert radian into degree
	//
	// @return converted degree value
	getDegreeFrom: function( param ) {
		return param.radian * (180 / Math.PI);
	}
}