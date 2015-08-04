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

    var selectedLayer = this.props.selectedLayer;
    var layerOperationClass;
    var createMaskClass;
    var applyMaskClass;
    if (!selectedLayer) {
      layerOperationClass = 'hide';
    } else {
      layerOperationClass = 'show';
      if (selectedLayer.get('mask')) {
        createMaskClass = 'hide';
        applyMaskClass = 'show';
      } else {
        createMaskClass = 'show';
        applyMaskClass = 'hide';
      }
    }

    return <div className='LayersSidebar'>
              <div>
                SVG Layers:
              </div>
              <div className="new-section">
                <table>
                  <tbody>
                  {
                    svgLayers.map(function(l, i) {
                      return <LayerSidebar svgLayer={l} key={i}></LayerSidebar>;
                    })
                  }
                  </tbody>
                </table>
              </div>
              <div className={layerOperationClass}>
                Layer operations
              </div>
              <div className={layerOperationClass}>
                <div className="new-section">
                  <button type="button" className="btn btn-default" onClick={this.layerAdd} title="New layer">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  </button>
                  <button type="button" className="btn btn-default" onClick={this.layerDelete} title="Remove layer">
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
                  <button type="button" className="btn btn-default" onClick={this.layerUp} title="Move layer up">
                    <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                  </button>
                  <button type="button" className="btn btn-default" onClick={this.layerDown} title="Move layer down">
                    <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
              <div className={layerOperationClass}>
                Mask operations
              </div>
              <div className={layerOperationClass}>
                <div className="new-section">
                  <div className={createMaskClass}>
                    <button type="button" className="btn btn-default" onClick={this.layerMask} title="Create new mask from selected layer">
                      <span className="glyphicon glyphicon-share" aria-hidden="true">New mask</span>
                    </button>
                  </div>
                  <div title="Apply selected mask to chosen layer" className={applyMaskClass}>
                    <div>
                      Apply mask to layer:
                    </div>
                    <select onChange={this.applyMask}>
                      {
                        svgLayers.filter(function(l) {
                          return !l.get('mask');
                        }).map(function(l, i) {
                          return <option value={l.get('name')} key={i}>{l.get('name')}</option>;
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>;
  }
});

module.exports = LayersSidebar;
