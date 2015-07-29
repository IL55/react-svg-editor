'use strict';

var Reflux = require('reflux');
var _ = require('lodash');

var ImageModel = require('./ImageModel');
var LayerActions = require('actions/LayerActions');
var ObjectActions = require('actions/ObjectActions');


var ImageStore = Reflux.createStore({
  /**
   * initial setup
   */
  init: function() {
      this.svgImage = ImageModel;

      // Register actions
      this.listenTo(LayerActions.changeLayerVisibility, this.onChangeLayerVisibility);
      this.listenTo(LayerActions.selectLayer, this.onSelectLayer);
      this.listenTo(ObjectActions.addNewObjectToLayer, this.onAddNewObjectToLayer);
      this.listenTo(ObjectActions.updateObjectAttributes, this.onUpdateObjectAttributes);
      this.listenTo(ObjectActions.moveObject, this.onMoveObject);
      this.listenTo(ObjectActions.scaleObject, this.onScaleObject);
      this.listenTo(ObjectActions.rotateObject, this.onRotateObject);
      this.listenTo(ObjectActions.selectObjectInSelectedLayer, this.onSelectObjectInSelectedLayer);
  },

  /**
   * get svg image model
   */
  getImage: function() {
    return this.svgImage;
  },

  /**
   * get selected svg object
   */
  getSelectedObject: function() {
    return this.selectedSvgObject;
  },

  /**
   * change layer visible show/hide
   * @param  {string} layerId for manipulation
   */
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

  /**
   * select layer (for editing)
   * @param  {string} layerId for manipulation
   */
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

  /**
   * add new object to selected layer
   * @param  {string} objectType new object type (tect/rect)
   */
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
  },

  onUpdateObjectAttributes: function(svgObject, attrs) {
    for (var k in attrs) {
      svgObject[k] = attrs[k];
    }

    // fire update notification
    this.trigger(this.svgImage);
  },

  onMoveObject: function(svgObject, newPosition) {
    svgObject.position.x = newPosition.x;
    svgObject.position.y = newPosition.y;

    // fire update notification
    this.trigger(this.svgImage);
  },

  onScaleObject: function(svgObject, newPosition) {
    svgObject.position.scale = newPosition.scale;

    // fire update notification
    this.trigger(this.svgImage);
  },

  onRotateObject: function(svgObject, newPosition) {
    svgObject.position.r = newPosition.r;

    // fire update notification
    this.trigger(this.svgImage);
  },

  onSelectObjectInSelectedLayer: function(selectedObject) {
    this.svgImage.selectedObject = selectedObject;

    // fire update notification
    this.trigger(this.svgImage);
  }
});

module.exports = ImageStore;
