'use strict';

var Reflux = require('reflux');
//var Actions = require('actions/..');
var ImageModel = require('./ImageModel');
var LayerActions = require('actions/LayerActions');
var _ = require('lodash');

var ImageStore = Reflux.createStore({
  // Initial setup
  init: function() {
      this.svgImage = ImageModel;

      // Register statusUpdate action
      this.listenTo(LayerActions.changeLayerVisibility, this.onChangeLayerVisibility);
  },
  /**
   * get svg image model
   */
  getImage: function() {
    return this.svgImage;
  },

  onChangeLayerVisibility: function(layerId) {
    // find layer and invert visible property
    var layer = _.find(this.svgImage.svgLayers, {name: layerId});
    if (!layer) {
      // no any layer found
      return;
    }

    if (layer.visible) {
      layer.visible = false;
    } else {
      layer.visible = true;
    }

    // Pass on to listeners
    this.trigger(this.svgImage);
  }

});

module.exports = ImageStore;
