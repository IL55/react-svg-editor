'use strict';

var Reflux = require('reflux');
//var Actions = require('actions/..');
var ImageModel = require('./ImageModel');
var LayerActions = require('actions/LayerActions');
var ObjectActions = require('actions/ObjectActions');
var _ = require('lodash');

var ImageStore = Reflux.createStore({
  // Initial setup
  init: function() {
      this.svgImage = ImageModel;

      // Register actions
      this.listenTo(LayerActions.changeLayerVisibility, this.onChangeLayerVisibility);
      this.listenTo(LayerActions.selectLayer, this.onSelectLayer);
      this.listenTo(ObjectActions.addNewObjectToLayer, this.onAddNewObjectToLayer);
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
  },

  onSelectLayer: function(layerId) {
    // find layer and select it
    var layer = _.find(this.svgImage.svgLayers, {name: layerId});
    if (!layer) {
      // no any layer found
      return;
    }

    // unselect previous layer
    var previousSelectedlayer = _.find(this.svgImage.svgLayers, {selected: true});
    if (previousSelectedlayer) {
      previousSelectedlayer.selected = false;
    }

    layer.selected = true;

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  onAddNewObjectToLayer: function(objectType) {
    // find selected layer
    var selectedlayer = _.find(this.svgImage.svgLayers, {selected: true});
    if (!selectedlayer) {
      // can't add anything
      return;
    }
    // create new object
    var svgObject = ImageModel.emptyObjectOfType(objectType);

    // add to layer
    selectedlayer.svgObjects.push(svgObject);

    // fire update notification
    this.trigger(this.svgImage);
  }
});

module.exports = ImageStore;
