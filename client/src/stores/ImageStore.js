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
      this.listenTo(LayerActions.preSelectLayer, this.onPreSelectLayer);
      this.listenTo(LayerActions.unPreSelectLayer, this.onUnPreSelectLayer);
      this.listenTo(LayerActions.deleteSelectedLayer, this.onDeleteSelectedLayer);
      this.listenTo(LayerActions.addNewLayer, this.onAddNewLayer);
      this.listenTo(LayerActions.moveUpSelectedLayer, this.onMoveUpSelectedLayer);
      this.listenTo(LayerActions.moveDownSelectedLayer, this.onMoveDownSelectedLayer);



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

    // remove object selection (due to in could be stay on other layer)
    this.svgImage.selectedObject = null;

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * pre-select (i.e. when user do "mouse over" on layer name)
   * it is used for highlight objects which belong to level
   * @param  {string} layerId for manipulation
   */
  onPreSelectLayer: function(layerId) {
    // find layer and pre-select it
    var layer = _.find(this.svgImage.svgLayers, {name: layerId});
    if (!layer) {
      // no any layer found
      return;
    }

    // un-pre-select previous pre-selected layer
    var previousSelectedlayer = _.find(this.svgImage.svgLayers, {selected: true});
    if (previousSelectedlayer) {
      previousSelectedlayer.preSelected = false;
    }

    layer.preSelected = true;

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * remove pre-selection
   * @param  {string} layerId for manipulation
   */
  onUnPreSelectLayer: function(layerId) {
    // find layer and un-pre-select it
    var layer = _.find(this.svgImage.svgLayers, {name: layerId});
    if (!layer) {
      // no any layer found
      return;
    }

    layer.preSelected = false;

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * remove selected layer
   */
  onDeleteSelectedLayer: function() {
    // find layer
    var layer = _.find(this.svgImage.svgLayers, {selected: true});
    if (!layer) {
      // no any layer found
      return;
    }

    this.svgImage.svgLayers = _.filter(this.svgImage.svgLayers, function(layerIt) {
      return (layerIt.selected !== true);
    });

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * add new layer
   */
  onAddNewLayer: function() {
    // create new object with name
    var newLayerName = 'Layer ' + (this.svgImage.svgLayers.length + 1);
    var newLayer = ImageModel.emptyLayer(newLayerName);

    this.svgImage.svgLayers.push(newLayer);

    this.trigger(this.svgImage);
  },

  /**
   * move layer up (exchange with previous level)
   */
  onMoveUpSelectedLayer: function() {
    // find layer
    var layerIndex = _.findIndex(this.svgImage.svgLayers, {selected: true});
    if (layerIndex <= 0) {
      return;
    }

    if (this.svgImage.svgLayers.length < 2) {
      return;
    }
    // exchange
    var temp = this.svgImage.svgLayers[layerIndex];
    this.svgImage.svgLayers[layerIndex] = this.svgImage.svgLayers[layerIndex - 1];
    this.svgImage.svgLayers[layerIndex - 1] = temp;

    this.trigger(this.svgImage);
  },

  /**
   * move layer down (exchange with previous level)
   */
  onMoveDownSelectedLayer: function() {
    // find layer
    var layerIndex = _.findIndex(this.svgImage.svgLayers, {selected: true});
    if ((layerIndex === -1) ||
        (layerIndex === this.svgImage.svgLayers.length - 1)) {
      return;
    }

    if (this.svgImage.svgLayers.length < 2) {
      return;
    }

    // exchange
    var temp = this.svgImage.svgLayers[layerIndex];
    this.svgImage.svgLayers[layerIndex] = this.svgImage.svgLayers[layerIndex + 1];
    this.svgImage.svgLayers[layerIndex + 1] = temp;

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

  /**
   * update some non-common attribute like text for text object
   * @param  {object} svgObject object
   * @param  {Array} attrs     list of attributes
   */
  onUpdateObjectAttributes: function(svgObject, attrs) {
    for (var k in attrs) {
      svgObject[k] = attrs[k];
    }

    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * move object to new position
   * @param  {object} svgObject object
   */
  onMoveObject: function(svgObject, newPosition) {
    svgObject.position.x = newPosition.x;
    svgObject.position.y = newPosition.y;

    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * re-scale object (set new scale)
   * @param  {object} svgObject object
   */
  onScaleObject: function(svgObject, newPosition) {
    svgObject.position.scale = newPosition.scale;

    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * rotate object to new angle
   * @param  {object} svgObject object
   */
  onRotateObject: function(svgObject, newPosition) {
    svgObject.position.r = newPosition.r;

    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * show selection for specific object which belongs to selected layer
   * @param  {string} layerId - object's layer ID
   * @param  {string} objectID - object ID (in layer)
   */
  onSelectObjectInSelectedLayer: function(layerID, objectID) {
    // find selected layer
    var selectedlayer = _.find(this.svgImage.svgLayers, {selected: true});
    if (!selectedlayer) {
      // can't add anything
      return;
    }

    if (selectedlayer.name !== layerID) {
      // can't select object on the other layer
      return;
    }

    this.svgImage.selectedObject = selectedlayer.svgObjects[objectID];

    // fire update notification
    this.trigger(this.svgImage);
  }
});

module.exports = ImageStore;
