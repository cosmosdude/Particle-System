function UIView() {
	
	var view = {
		// super html element
		superLayer: null,
		
		// super ui view
		superView: null,
		
		subviews: [],
		
		// self reflecting html layer
		layer: document.createElement('div'),
		
		_frame: {
			x:0,
			y:0,
			width:0,
			height:0
		},
		
		removeFromSuperLayer: function() {
			if (view.superLayer != null) {
				superLayer.removeChild(view.layer);
				view.superLayer = null;
			}	
		},
		
		// Remove from super view.
		//
		removeFromSuperView: function() {
			if (view.superView != null) {
				
				view.superView.removeSubview(view);
				view.superView = null;
				
				view.removeFromSuperLayer();
			}
		},
		
		
		// Add a new subview and it's layer to html element hierchy
		//
		addSubview: function( subview ) {
			var index = view.subviews.indexOf(subview);
			if (index != -1) {
				
			}
		},
		
		
		// This doesn't graphically remove the view from html layer.
		// Should call removeFromSuperLayer(); to be removed properly.
		//
		removeSubview: function() {
			
		},
	};
	
	
	// Setter parameter should be string value
	//
	Object.defineProperty(view, 'backgroundColor', {
		
		
		set: function( value ) {
			view.layer.style['background-color'] = value;
		},
		
		get : function() {
			return view.layer.style['background-color'];
		}
		
		configurable: false
	});
	
	
	// Setter parameter should be object with signature of {x:y:width:height:}
	//
	Object.defineProperty(view, 'frame', {
		set: function(value) {
			view._frame = value;
			view.layer.style['left'] = value.x + 'px';
			view.layer.style['top'] = value.y + 'px';
			view.layer.style['width'] = value.width + 'px';
			view.layer.style['height'] = value.height + 'px';
		},
		
		get : function() {
			return view._frame;
		},
		
		configurable: false
	});
	
	view.layer.style['position'] = 'fixed';
	view.backgroundColor = '#ffffff';
	view.layer.style['transition'] = '1s all linear';
	
	
	return view;
}