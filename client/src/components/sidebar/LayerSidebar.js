'use strict';
var React = require('react');
var LayerActions = require('actions/LayerActions');
require('styles/LayerSidebar.less');

var openEyeImg = require('../../images/eye_open.png');
var closedEyeImg = require('../../images/eye_closed.png');

var LayerSidebar = React.createClass({
  changeLayerVisibility: function() {
    LayerActions.changeLayerVisibility(this.props.svgLayer.get('name'));
  },

  selectLayer: function() {
    LayerActions.selectLayer(this.props.svgLayer.get('name'));
  },

  preSelectlayer: function() {
    LayerActions.preSelectLayer(this.props.svgLayer.get('name'));
  },

  unPreSelectlayer: function() {
    LayerActions.unPreSelectLayer(this.props.svgLayer.get('name'));
  },

  removeMask: function() {
    LayerActions.removeMaskFromSelectedLayer(this.props.svgLayer.get('name'));
  },

  render: function() {
    var eyeImg;
    if (this.props.svgLayer.get('visible') ||
        this.props.svgLayer.get('mask')) { // mask always visible
      eyeImg = openEyeImg;
    } else {
      eyeImg = closedEyeImg;
    }

    var selectedClass = 'LayerSidebar';
    if (this.props.svgLayer.get('selected')) {
      selectedClass += ' SelectedLayer';
    }

    var svgObjects = this.props.svgLayer.get('svgObjects');

    return <tr className={selectedClass} onMouseOver={this.preSelectlayer} onMouseLeave={this.unPreSelectlayer}>
              <td onClick={this.changeLayerVisibility}>
                <img src={eyeImg} className='eye-icon' title="Layer visibility, click to change" />
              </td>
              <td onClick={this.selectLayer}>
                <span title="Layer name, click to select layer">
                  <span className="label label-primary">
                    {this.props.svgLayer.get('name')}
                  </span>
                  <span className="badge" title="Number of svg objects">
                    {svgObjects.size}
                  </span>
                  <span className="badge" title="Mask added to layer, click to remove" onClick={this.removeMask}>
                    {this.props.svgLayer.get('maskAdded')}
                  </span>
                </span>
              </td>
           </tr>;
  }
});

module.exports = LayerSidebar;
