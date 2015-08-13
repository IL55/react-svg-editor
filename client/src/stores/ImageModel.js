'use strict';

var Immutable = require('immutable');

var EditorStates = require('./EditorStates');

var initialImage = Immutable.fromJS({
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
   * svg image editing state
   * @type {Number}
   */
  editState: EditorStates.SELECT_OBJ,

  /**
   * svg image editing state data
   * in some state
   * @type {Number}
   */
  editStateData: null,

  /**
   * SVG layers, each layer is a group of svg objects (rectangles or texts)
   * @type {Object}
   */
  svgObjects: [
    { id: 'rect1', type: 'rect', position: { scale: 1, x: 200, y: 200, r: 10, width: 220, height: 250 }, fill: 'green' },
    { id: 'photo1', type: 'photo', position: { scale: 1, x: 340, y: 100, r: 0, width: 50, height: 50 }, src: require('../images/photos/schoolgirl.jpg') },
    { id: 'rect2', type: 'rect', position: { scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }, fill: 'blue' },
    { id: 'rect3', type: 'rect', position: { scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }, fill: 'white' },
    { id: 'rect4', type: 'rect', position: { scale: 1, x: 220, y: 220, r: 100, width: 100, height: 100 }, fill: 'black' },
    { id: 'polygon1', type: 'polygon',
        position: { scale: 1, x: 500, y: 300, r: -15, width: 148, height: 114 }, fill: 'magenta',
        polygon: [{cmd: 'M', x: -16, y: -55}, {cmd: 'L', x: 42, y: -57}, {cmd: 'L', x: 74, y: -26}, {cmd: 'L', x: 44, y: 42}, {cmd: 'L', x: -27, y: 57}, {cmd: 'L', x: -74, y: -12}]
    },
    { id: 'polygon2', type: 'polygon',
        position: { scale: 1, x: 584, y: 102, r: -15, width: 133, height: 112 }, fill: 'purple',
        polygon: [{cmd: 'M', x: -16, y: -55}, {cmd: 'C', x1: 94, y1: -129, x2: 127, y2: 134, x: 59, y: 41}, {cmd: 'L', x: -27, y: 57}, {cmd: 'L', x: -74, y: -12}]
    }
  ],

  /**
   * SVG layers, each layer is a group of svg objects (rectangles or texts)
   * @type {Object}
   */
  svgLayers: [
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
      svgObjects: [ 'rect1', 'photo1', 'polygon1', 'polygon2']
    },
    {
      name: 'Layer2',
      visible: true,
      maskAdded: 'Layer3mask',
      svgObjects: ['rect2']
    },
    {
      name: 'Layer3',
      visible: false,
      svgObjects: ['rect3', 'rect4']
    },
    {
      name: 'Layer3mask',
      visible: true,
      mask: true,
      svgObjects: ['rect3', 'rect4']
    }
  ],
  /**
   * create empty svg object specified type
   * @param  {string} type  - of the object (text/rect)
   * @return {object} new svg object
   */
  emptyObjectOfType: function(type, attrs) {
    var svgObject = Immutable.fromJS({ type: type, position: { scale: 1, x: 100, y: 30, r: 0, width: 100, height: 50} });
    if (type === 'rect') {
      svgObject = svgObject.set('fill', 'red');
    }

    if (type === 'text') {
      svgObject = svgObject.set('text', 'Text');
    }

    if (type === 'polygon') {
      svgObject = svgObject.set('fill', 'magenta');
    }

    if (attrs) {
      svgObject = svgObject.merge(attrs);
    }

    return svgObject;
  },
  /**
   * create empty layer object
   * @param  {string} name  - layer name
   * @return {object} new layer (group of svg objects)
   */
  emptyLayer: function(name) {
    return Immutable.fromJS({
      name: name,
      visible: true,
      svgObjects: []
    });
  },
  /**
   * create mask
   * @param  {string} name  - layer name
   * @return {object} new layer (group of svg objects)
   */
  createMask: function(layer) {
    var mask = layer;
    mask = mask.set('selected', false);
    mask = mask.set('name', mask.get('name') + 'mask');
    mask = mask.set('mask', true);
    return mask;
  }

});


module.exports = initialImage;
