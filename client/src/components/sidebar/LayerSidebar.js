'use strict';
var React = require('react');
var LayerActions = require('actions/LayerActions');
require('styles/LayerSidebar.less');

var openEyeImg = require('../../images/eye_open.png');
var closedEyeImg = require('../../images/eye_closed.png');

var LayerSidebar = React.createClass({
  changeLayerVisibility: function() {
    LayerActions.changeLayerVisibility(this.props.svgLayer.name);
  },

  selectLayer: function() {
    LayerActions.selectLayer(this.props.svgLayer.name);
  },

  render: function() {
    var eyeImg;
    if (this.props.svgLayer.visible) {
      eyeImg = openEyeImg;
    } else {
      eyeImg = closedEyeImg;
    }

    var selectedClass = 'LayerSidebar';
    if (this.props.svgLayer.selected) {
      selectedClass += ' SelectedLayer';
    }

    return <tr className={selectedClass}>
              <td onClick={this.changeLayerVisibility}>
                <img src={eyeImg} className='eye-icon'/>
              </td>
              <td onClick={this.selectLayer}>
                {this.props.svgLayer.name}
              </td>
           </tr>;
  }
});

module.exports = LayerSidebar;
