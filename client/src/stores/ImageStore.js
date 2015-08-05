'use strict';

var Reflux = require('reflux');

var ImageModel = require('./ImageModel');
var LayerActions = require('actions/LayerActions');
var ObjectActions = require('actions/ObjectActions');
var HistoryActions = require('actions/HistoryActions');


var ImageStore = Reflux.createStore({
  /**
   * initial setup
   */
  init: function() {
      this.svgImage = ImageModel;
      HistoryActions.addToHistory(this.svgImage);

      // Register actions
      this.listenTo(LayerActions.changeLayerVisibility, this.onChangeLayerVisibility);
      this.listenTo(LayerActions.selectLayer, this.onSelectLayer);
      this.listenTo(LayerActions.preSelectLayer, this.onPreSelectLayer);
      this.listenTo(LayerActions.unPreSelectLayer, this.onUnPreSelectLayer);
      this.listenTo(LayerActions.deleteSelectedLayer, this.onDeleteSelectedLayer);
      this.listenTo(LayerActions.addNewLayer, this.onAddNewLayer);
      this.listenTo(LayerActions.moveUpSelectedLayer, this.onMoveUpSelectedLayer);
      this.listenTo(LayerActions.moveDownSelectedLayer, this.onMoveDownSelectedLayer);
      this.listenTo(LayerActions.createMaskFromSelectedLayer, this.onCreateMaskFromSelectedLayer);
      this.listenTo(LayerActions.applyMaskToLayer, this.onApplyMaskToLayer);
      this.listenTo(LayerActions.removeMaskFromSelectedLayer, this.removeMaskFromSelectedLayer);

      this.listenTo(ObjectActions.addNewObjectToLayer, this.addNewObjectToLayer);
      this.listenTo(ObjectActions.updateObjectAttributes, this.onUpdateObjectAttributes);
      this.listenTo(ObjectActions.moveObject, this.changePosition);
      this.listenTo(ObjectActions.scaleObject, this.changePosition);
      this.listenTo(ObjectActions.rotateObject, this.changePosition);
      this.listenTo(ObjectActions.selectObjectInSelectedLayer, this.onSelectObjectInSelectedLayer);

      this.listenTo(HistoryActions.setHistorySnapshotToSvgImage, this.setHistorySnapshotToSvgImage);
  },

  /**
   * get svg image model
   */
  getImage: function() {
    return this.svgImage;
  },

  /**
   * set svg image model (form history snapshots)
   */
  setHistorySnapshotToSvgImage: function(svgImage) {
    this.svgImage = svgImage;

    // Pass on to listeners
    this.trigger(this.svgImage);
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
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    if (layer.get('visible')) {
      layer = layer.set('visible', false);
    } else {
      layer = layer.set('visible', true);
    }

    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    this.svgImage = this.svgImage.set('selectedObjectId', null);

    HistoryActions.addToHistory(this.svgImage);
    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * select layer (for editing)
   * @param  {string} layerId for manipulation
   */
  onSelectLayer: function(layerId) {
    // find layer and select it
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    // unselect previous layer
    var previousSelectedlayerIndex = layers.findIndex(function(l) {
      return l.get('selected');
    });

    if (previousSelectedlayerIndex !== -1) {
      var previousSelectedlayer = layers.get(previousSelectedlayerIndex);
      previousSelectedlayer = previousSelectedlayer.set('selected', false);
      layers = layers.set(previousSelectedlayerIndex, previousSelectedlayer);
      this.svgImage = this.svgImage.set('svgLayers', layers);
    }

    layer = layer.set('selected', true);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    // remove object selection (due to in could be stay on other layer)
    this.svgImage = this.svgImage.set('selectedObjectId', null);

    HistoryActions.addToHistory(this.svgImage);
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
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    // unselect previous layer
    var previousSelectedlayerIndex = layers.findIndex(function(l) {
      return l.get('preSelected');
    });

    if (previousSelectedlayerIndex !== -1) {
      var previousSelectedlayer = layers.get(previousSelectedlayerIndex);
      previousSelectedlayer = previousSelectedlayer.set('preSelected', false);
      layers = layers.set(previousSelectedlayerIndex, previousSelectedlayer);
      this.svgImage = this.svgImage.set('preSelected', layers);
    }

    layer = layer.set('preSelected', true);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * remove pre-selection
   * @param  {string} layerId for manipulation
   */
  onUnPreSelectLayer: function(layerId) {
    // find layer and un-pre-select it
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    layer = layer.set('preSelected', false);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * remove selected layer
   */
  onDeleteSelectedLayer: function() {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('selected');
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    layers = layers.delete(layerIndex);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    // if it is mask we should remove references from other layers
    if (layer.get('mask')) {
      var svgImg = this.svgImage;
      layers.forEach(function(layerIt, i) {
        if (layerIt.get('maskAdded') === layer.get('name')) {
          var newLayer = layerIt.delete('maskAdded');
          layers = layers.set(i, newLayer);
          svgImg = svgImg.set('svgLayers', layers);
        }
      });

      this.svgImage = svgImg;
    }

    // remove object selection (due to in could be stay on other layer)
    this.svgImage = this.svgImage.set('selectedObjectId', null);

    HistoryActions.addToHistory(this.svgImage);
    // Pass on to listeners
    this.trigger(this.svgImage);
  },

  /**
   * add new layer
   */
  onAddNewLayer: function() {
    // create new object with name
    var newLayerName = 'Layer' + (this.svgImage.get('svgLayers').size + 1);
    var newLayer = ImageModel.get('emptyLayer')(newLayerName);

    var newLayers = this.svgImage.get('svgLayers').push(newLayer);
    this.svgImage = this.svgImage.set('svgLayers', newLayers);

    HistoryActions.addToHistory(this.svgImage);
    this.trigger(this.svgImage);
  },

  /**
   * move layer up (exchange with previous level)
   */
  onMoveUpSelectedLayer: function() {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('selected');
    });
    if (layerIndex <= 0) {
      return;
    }

    if (layers.size < 2) {
      return;
    }
    // exchange
    var layer = layers.get(layerIndex);
    var layerPrev = layers.get(layerIndex - 1);
    layers = layers.set(layerIndex, layerPrev);
    layers = layers.set(layerIndex - 1, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    this.trigger(this.svgImage);
  },

  /**
   * move layer down (exchange with previous level)
   */
  onMoveDownSelectedLayer: function() {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('selected');
    });
    if ((layerIndex === -1) ||
        (layerIndex === layers.size - 1)) {
      return;
    }

    if (layers.size < 2) {
      return;
    }

    // exchange
    var layer = layers.get(layerIndex);
    var layerNext = layers.get(layerIndex + 1);
    layers = layers.set(layerIndex, layerNext);
    layers = layers.set(layerIndex + 1, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    this.trigger(this.svgImage);
  },

  /**
   * create mask from selected layer
   */
  onCreateMaskFromSelectedLayer: function() {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    var layer = layers.find(function(l) {
      return l.get('selected');
    });
    if (!layer) {
      // no any layer found
      return;
    }

    // create mask from layer
    var mask = ImageModel.get('createMask')(layer);

    // try to find if mask with same name exists already
    var theSameNameMaskIndex = layers.findIndex(function(l) {
      return l.get('name') === mask.get('name');
    });

    if (theSameNameMaskIndex === -1) {
      // push masks
      layers = layers.push(mask);
    } else {
      // update mask
      layers = layers.set(theSameNameMaskIndex, mask);
    }
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    this.trigger(this.svgImage);
  },

  /**
   * apply mask to specified layer
   */
  onApplyMaskToLayer: function(layerId) {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    var mask = layers.find(function(l) {
      return l.get('mask') && l.get('selected');
    });
    if (!mask) {
      // no any layer found
      return;
    }

    // find layer
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    layer = layer.set('maskAdded', mask.get('name'));
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    // push masks
    this.trigger(this.svgImage);
  },

  removeMaskFromSelectedLayer: function(layerId) {
    // find layer
    var layers = this.svgImage.get('svgLayers');
    // find layer
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerId;
    });
    if (layerIndex === -1) {
      // no any layer found
      return;
    }
    var layer = layers.get(layerIndex);

    layer = layer.set('maskAdded', null);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    // push masks
    this.trigger(this.svgImage);
  },

  /**
   * add new object to selected layer
   * @param  {string} objectType new object type (tect/rect)
   */
  addNewObjectToLayer: function(objectType, attrs) {
    // find selected layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('selected');
    });
    if (layerIndex === -1) {
      // can't add anything
      return;
    }
    var layer = layers.get(layerIndex);

    // create new object
    var svgObject = ImageModel.get('emptyObjectOfType')(objectType, attrs);

    // add to layer
    var svgObjects = layer.get('svgObjects').push(svgObject);

    layer = layer.set('svgObjects', svgObjects);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * update some non-common attribute like text for text object
   * @param  {object} svgObject object
   * @param  {Array} attrs     list of attributes
   */
  onUpdateObjectAttributes: function(layerID, objectID, attrs) {
    // find selected layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerID;
    });
    if (layerIndex === -1) {
      return;
    }
    var layer = layers.get(layerIndex);
    var svgObjects = layer.get('svgObjects');
    var svgObject = svgObjects.get(objectID);

    svgObject = svgObject.merge(attrs);

    svgObjects = svgObjects.set(objectID, svgObject);
    layer = layer.set('svgObjects', svgObjects);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
    // fire update notification
    this.trigger(this.svgImage);
  },

  /**
   * move object to new position
   * @param  {object} svgObject object
   */
  changePosition: function(layerID, objectID, newPosition) {
    // find selected layer
    var layers = this.svgImage.get('svgLayers');
    var layerIndex = layers.findIndex(function(l) {
      return l.get('name') === layerID;
    });
    if (layerIndex === -1) {
      return;
    }
    var layer = layers.get(layerIndex);
    var svgObjects = layer.get('svgObjects');
    var svgObject = svgObjects.get(objectID);
    var pos = svgObject.get('position');

    pos = pos.merge(newPosition);

    svgObject = svgObject.set('position', pos);
    svgObjects = svgObjects.set(objectID, svgObject);
    layer = layer.set('svgObjects', svgObjects);
    layers = layers.set(layerIndex, layer);
    this.svgImage = this.svgImage.set('svgLayers', layers);

    HistoryActions.addToHistory(this.svgImage);
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
    var layers = this.svgImage.get('svgLayers');
    var layer = layers.find(function(l) {
      return l.get('selected');
    });
    if (!layer) {
      return;
    }

    if (layer.get('name') !== layerID) {
      // can't select object on the other layer
      return;
    }

    this.svgImage = this.svgImage.set('selectedObjectId', objectID);

    HistoryActions.addToHistory(this.svgImage);
    // fire update notification
    this.trigger(this.svgImage);
  }
});

module.exports = ImageStore;
