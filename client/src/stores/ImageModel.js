'use strict';

var _ = require('lodash');
var Immutable = require('immutable');

var initialImage = Immutable.Map({
  /**
   * width of svg image
   * @type {Number}
   */
  width: 800,

  /**
   * height of svg image
   * @type {Number}
   */
  height: 600,

  /**
   * SVG layers, each layer is a group of svg objects (rectangles or texts)
   * @type {Object}
   */
  svgLayers: Immutable.List([
    {
      /**
       * name of layer (and it's id)
       * @type {string}
       */
      name: 'Layer1',
      /**
       * should be layer shown or hided
       * @type {boolean}
       */
      visible: true,
       /**
       * list of svg object belongs to layer
       * @type {list}
       */
      svgObjects: [
        { type: 'rect', position: { scale: 1, x: 200, y: 200, r: 10, width: 220, height: 250 }, fill: 'green' }
      ]
    },
    {
      name: 'Layer2',
      visible: true,
      maskAdded: 'Layer3mask',
      svgObjects: [
        { type: 'rect', position: { scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }, fill: 'blue' }
      ]
    },
    {
      name: 'Layer3',
      visible: false,
      svgObjects: [
        { type: 'rect', position: { scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }, fill: 'white' },
        { type: 'rect', position: { scale: 1, x: 220, y: 220, r: 100, width: 100, height: 100 }, fill: 'black' }
      ]
    },
    {
      name: 'Layer3mask',
      visible: true,
      mask: true,
      svgObjects: [
        { type: 'rect', position: { scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }, fill: 'white' },
        { type: 'rect', position: { scale: 1, x: 220, y: 220, r: 100, width: 100, height: 100 }, fill: 'black' }
      ]
    }
  ]),
  /**
   * create empty svg object specified type
   * @param  {string} type  - of the object (text/rect)
   * @return {object} new svg object
   */
  emptyObjectOfType: function(type) {
    var svgObject = { type: type, position: { x: 100, y: 30, r: 0, width: 100, height: 50 } };
    if (type === 'rect') {
      svgObject.fill = 'red';
    }
    if (type === 'text') {
      svgObject.text = 'Text';
    }

    return svgObject;
  },
  /**
   * create empty layer object
   * @param  {string} name  - layer name
   * @return {object} new layer (group of svg objects)
   */
  emptyLayer: function(name) {
    return {
      name: name,
      visible: true,
      svgObjects: []
    };
  },
  /**
   * create mask
   * @param  {string} name  - layer name
   * @return {object} new layer (group of svg objects)
   */
  createMask: function(layer) {
    var mask = _.clone(layer, true);
    mask.selected = false;
    mask.name += 'mask';
    mask.mask = true;
    return mask;
  }

});


module.exports = initialImage;
