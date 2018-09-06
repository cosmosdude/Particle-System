/*
	@file: partical.js
	@author: Thwin Htoo Aung
	
	This file includes a representation for partical which will possibly be lurking on the canvas.
*/


function Partical() {
	var partical = {
		
		// self representing index in partical pool
		//
		index : -1,
		
		// randomized starting location
		//
		start: {x: 0, y: 0},
		
		
		// randomized ending location.
		//
		// This doesnt mean partical will disappear at this location.
		//
		// Partical will be dismissed and a new one will be created only when
		// current partical hit or exceed the bounds of window.
		//
		end: {x: 0, y: 0},
		
		
		
		// Calculated distance based on starting and ending location.
		//
		distance: {x:0 , y:0},
		
		
		// Velocity per fps calculated upon distance and engine's travel time for partical
		//
		velocity: { x: 0, y: 0 },
		
		
		// Graphical coordinate and area representing the partical.
		//
		// Partical shapes of partical such as orbs, dots, squares, or polygons should only appear only inside this coordinate. 
		frame: {x:0, y:0, width: 1, height: 1},
		
		
		// Transform for both width and height(no such scaleX and scaleY, just scale)
		//
		// Sizes (width and height) of partical is determined and drawn by this property
		// regardless of their original 'frame.width' and 'frame.height'.
		scale: 1
	};
	
	
	
	return partical;
}