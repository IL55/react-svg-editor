'use strict';
var React = require('react');
var LayerSidebar = require('./LayerSidebar');
var LayerActions = require('actions/LayerActions');
require('styles/LayersSidebar.less');

var LayersSidebar = React.createClass({
  layerUp: function() {
    LayerActions.moveUpSelectedLayer();
  },
  layerDown: function() {
    LayerActions.moveDownSelectedLayer();
  },
  layerDelete: function() {
    LayerActions.deleteSelectedLayer();
  },
  layerAdd: function() {
    LayerActions.addNewLayer();
  },
  layerMask: function() {
    LayerActions.createMaskFromSelectedLayer();
  },
  applyMask: function(e) {
    var layerID = e.target.value;
    LayerActions.applyMaskToLayer(layerID);
  },
  render: function() {
    var svgLayers = this.props.layers;


    return <div className='LayersSidebar'>
              <div>
                SVG Layers:
              </div>
              <div>
                <div>
                  <button onClick={this.layerUp}>Layer Up</button>
                  <button onClick={this.layerDown}>Layer Down</button>
                </div>
                <div>
                  <button onClick={this.layerAdd}>Add New</button>
                  <button onClick={this.layerDelete}>Delete</button>
                  <button onClick={this.layerMask}>Create mask</button>
                </div>
                <div>
                  Apply mask to:
                  <select onChange={this.applyMask}>
                    {
                      svgLayers.filter(function(l) {
                        return !l.mask;
                      }).map(function(l, i) {
                        return <option value={l.name} key={i}>{l.name}</option>;
                      })
                    }
                  </select>
                </div>
              </div>
              <table>
                <tbody>
                {
                  svgLayers.map(function(l, i) {
                    return <LayerSidebar svgLayer={l} key={i}></LayerSidebar>;
                  })
                }
                </tbody>
              </table>
            </div>;
  }
});

module.exports = LayersSidebar;
