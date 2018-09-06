/*
	@file: canvas-handler.js
	@author: Thwin Htoo Aung
	
	This file includes C like APIs for handling HTML canvas
*/

var CHProperties = {
	canvasRef: null,
	canvas2dContext: null,
//	fillColor: "#000000",
//	strokeColor: "#000000",
//	lineWidth: 1,
	
	// location of mouse pointer in canvas
	pointerLoc: {x:0, y:0}
};


var kPCanvasLineCapRound = 'round';
var kPCanvasLineCapButt = 'butt';
var kPCanvasLineCapSquare = 'square';

var kPCanvasLineJoinRound = 'round';
var kPCanvasLineJoinBevel = 'bevel';
var kPCanvasLineJoinMiter = 'miter';










// MARK:- Retaining and Releasing the canvas

/*!
	Initialization.
	Release with PCanvasRelease() for future reinitialization
*/
function PCanvasRetain( ref ) {
	CHProperties.canvasRef = ref;
	CHProperties.canvas2dContext = ref.getContext('2d');
	
	ref.onmousedown = function( mevent ) {
		CHProperties.pointerLoc.x = mevent.clientX;
		CHProperties.pointerLoc.y = mevent.clientY;
	};
	
	ref.onmousemove = function( mevent ) {
		CHProperties.pointerLoc.x = mevent.clientX;
		CHProperties.pointerLoc.y = mevent.clientY;
	};
	
	ref.onmouseout = function ( mevent ) {
		CHProperties.pointerLoc.x = mevent.clientX;
		CHProperties.pointerLoc.y = mevent.clientY;
	};
	
	ref.onmouseover = function ( mevent ) {
		CHProperties.pointerLoc.x = mevent.clientX;
		CHProperties.pointerLoc.y = mevent.clientY;
	};
	
	ref.onmouseup = function ( mevent ) {
		CHProperties.pointerLoc.x = mevent.clientX;
		CHProperties.pointerLoc.y = mevent.clientY;
	};
}


/*!
	Release canvas and it's properties.
*/
function PCanvasRelease() {
	CHProperties.canvasRef = null;
	CHProperties.canvas2dContext = null;
	
	CHProperties.pointerLoc = {x: 0, y: 0};
}










// MARK:- Canvas property exposure

// Invoke to get the currently retained canvas
// 
// @return: Canvas
function PCanvasGetCurrentRef() {
	return CHProperties.canvasRef;
}

// Invoke to get the current graphics context of current canvas.
// Returns 'null' if unavailable
// 
// @return: CanvasContext
function PCanvasGetCurrentContext() {
	return CHProperties.canvas2dContext;
}












// MARK:- Clearing the canvas


/*!
	Clear graphics context in specific frame
*/
function PCanvasClearInRect(x /*Number*/, y /*Number*/, width /*Number*/, height /*Number*/) {
	PCanvasGetCurrentContext().clearRect(x, y, width, height);
}

/*!
	Clear entire graphics context of canvas
*/
function PCanvasClear() {
	PCanvasClearInRect(0, 0, CHProperties.canvasRef.width, CHProperties.canvasRef.width);
}











// MARK:- Specifying points of canvas

/*
	Begins a path, or resets the current path
*/
function PCanvasBeginPath() {
//	PCanvasGetCurrentContext().stroke();
//	PCanvasGetCurrentContext().fill();
	PCanvasGetCurrentContext().beginPath();
}



/*
	Create drawable points from the current point back to the starting point of the current path.
	Current path can be changed by calling PCanvasBeginPath()
*/
function PCanvasClosePath() {
	PCanvasGetCurrentContext().closePath();
}


/*
	Move the graphics pointer to specific point leaving the previous path ended and drawn if any.
*/
function PCanvasMoveToPoint(x, y) {
//	PCanvasBeginPath();
	PCanvasGetCurrentContext().moveTo(x, y);
}



/*
	Add a line from current point to specific point
*/
function PCanvasAddLineToPoint(x, y) {
	PCanvasGetCurrentContext().lineTo(x, y);
}


/*
	Draw an arc at specific center point with radius starting from given radian and ending at given radian.
	
	@param centerX Center point X of Arc to be drawn at.
	@param centerY Center point Y of Arc to be drawn at.
	@param radius Radius of Arc to be used at drawing.
	@param startingAngleInRadian Starting angle of the arc to be drawn from. (must be in radian)
	@param endingAngleInRadian Ending angle of the arc to be drawn at. (must be in radian)
*/
function PCanvasAddArcToPoint(centerX, centerY,  radius, startingAngleInRadian, endingAngleInRadian) {
	PCanvasGetCurrentContext().arc(centerX, centerY, radius, startingAngleInRadian, endingAngleInRadian);
}


/*
	Draw a circle at specific center point with radius.
	
	@param centerX Center point X of Circle to be drawn at.
	@param centerY Center point Y of Circle to be drawn at.
	@param radius Radius of circle to be used at drawing.
	
*/
function PCanvasAddCircleToPoint(centerX, centerY, radius) {
	PCanvasAddArcToPoint(centerX, centerY, radius, 0, Math.PI * 2);
}



/*
	Draw an arc at specific center point with given arc values by ending previous path.
	
	@param centerX Center point X of Arc to be drawn at.
	@param centerY Center point Y of Arc to be drawn at.
	@param radius Radius of Arc to be used at drawing.
	@param startingAngleInRadian Starting angle of the arc to be drawn from. (must be in radian)
	@param endingAngleInRadian Ending angle of the arc to be drawn at. (must be in radian)
*/
function PCanvasAddIsolatedArcToPoint(centerX, centerY, radius, startingAngleInRadian, endingAngleInRadian) {
	
	// Clearing previous point and moving graphics pen to target location
	PCanvasMoveToPoint( 
		centerX + (radius * Math.cos(startingAngleInRadian)) ,
		centerY + (radius * Math.sin(startingAngleInRadian))
	);
	
	PCanvasAddArcToPoint(centerX, centerY, radius, startingAngleInRadian, endingAngleInRadian);
}


/*
	Draw a circle at specific center point with radius by ending previous path.
	
	@param centerX Center point X of Circle to be drawn at.
	@param centerY Center point Y of Circle to be drawn at.
	@param radius Radius of circle to be used at drawing.
	
*/
function PCanvasAddIsolatedCircleToPoint(centerX, centerY, radius) {
	PCanvasAddIsolatedArcToPoint(centerX, centerY, radius, 0, Math.PI * 2);
}



// Add a Quadratic Curve to specific point from whatever current point
// Will implement in future if needed
function PCanvasAddQuadCurveToPoint(x, y) {
	// TODO: implement
}

// Add a Qubic Bezier Curve to specific point from whatever current point
function PCanvasAddCurveToPoint(controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, toX, toY) {
	// TODO: implement
}











// Mark: - Drawing the canvas

/*
	Fill the enclosed parts of retained canvas
*/
function PCanvasFill() {
	PCanvasGetCurrentContext().fill();
}


/*
	Stroke currently defined paths onto canvas.
	Should call PCanvasClear() if you are working with fps based graphics.
*/
function PCanvasStroke() {
	PCanvasGetCurrentContext().stroke();
}








function PCanvasGetCurrentMouseLocation() {
	return CHProperties.pointerLoc;
}















// MARK:- Configuring Graphics Options of Canvas

/*
	Set stroke color of currrent context

	@param colorString Color format in String type of either hash format, rgba string format, or hsv string format
*/
function PCanvasSetStroke( colorString ) {
	PCanvasGetCurrentContext().strokeStyle = colorString;
}


/*
	Set fill color of currrent context

	@param colorString Color format in String type of either hash format, rgba string format, or hsv string format
*/
function PCanvasSetFill( colorString ) {
	PCanvasGetCurrentContext().fillStyle = colorString;
}


function PCanvasSetLineWidth( lineWidth ) {
	PCanvasGetCurrentContext().lineWidth = lineWidth;
}



function PCanvasSetWidth(width) {
	PCanvasGetCurrentRef().width = width;
}
function PCanvasSetHeight(height) {
	PCanvasGetCurrentRef().height = height;
}

function PCanvasGetWidth() {
	return PCanvasGetCurrentRef().width;
}
function PCanvasGetHeight() {
	return PCanvasGetCurrentRef().height;
}



function PCanvasSetLineJoinStyle( lineJoinStyle ) {
	PCanvasGetCurrentContext().lineJoin = lineJoinStyle;
}

function PCanvasSetLineCapStyle( lineCapStyle) {
	PCanvasGetCurrentContext().lineCap = lineCapStyle;
}
