'use strict';
var React = require('react');


var ImagePreview = require('./preview/ImagePreview');
var ImageSidebar = require('./sidebar/ImageSidebar');

var emptyObjectOfType = function(type){
	var svgObject = { type: type, position: { x: 100, y: 30, r: 0, width: 100, height: 50 } };
	if (type === 'rect') {
		svgObject.fill = 'red';
	}
	if (type === 'text') {
		svgObject.text = 'Text';
	}

	return svgObject;
};

var ImageEditor = React.createClass({
	getInitialState: function() {
		return { image: this.props.initialImage, selectedObject: null };
	},

	updateObject: function(svgObject, attrs) {
		for (var k in attrs) {
			svgObject[k] = attrs[k];
		}
		this.setState({ image: this.state.image });
	},

	selectObject: function(svgObject) {
		this.setState({ selectedObject: svgObject });
	},

	addObject: function(type) {
		var svgObject = emptyObjectOfType(type);
		this.state.image.svgObjects.push(svgObject);
		this.setState({ image: this.state.image });
	},

	render: function() {
		return <div className='image-editor'>
					<ImageSidebar svgObject={this.state.selectedObject}
						addObject={this.addObject}
						updateObject={this.updateObject}/>
					<ImagePreview image={this.state.image}
						selectedObject={this.state.selectedObject}
						selectObject={this.selectObject}
						updateObject={this.updateObject} />
			</div>;
	}
});

module.exports = ImageEditor;
