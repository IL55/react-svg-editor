'use strict';

var initialImage = {
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
  svgLayers: [
    {
      /**
       * name of layer (and it's id)
       * @type {string}
       */
      name: 'layer 1',
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
        { type: 'text', position: { scale: 1, x: 400, y: 300, r: 20, width: 200, height: 100 }, text: 'Simple text 1'},
        { type: 'text', position: { scale: 1.6, x: 400, y: 200, r: 90, width: 200, height: 100 }, text: 'Long long text 2'},
        { type: 'rect', position: { scale: 1, x: 20, y: 20, r: 50, width: 20, height: 50 }, fill: 'green' },
        { type: 'rect', position: { scale: 1, x: 320, y: 520, r: 150, width: 120, height: 250 }, fill: 'black' }
      ]
    },
    {
      name: 'layer 2',
      visible: true,
      selected: true,
      svgObjects: [
        { type: 'text', position: { scale: 1, x: 500, y: 30, r: 40, width: 200, height: 100 }, text: 'Layer 2'}
      ]
    },
    {
      name: 'layer 3',
      visible: false,
      svgObjects: [
        { type: 'text', position: { scale: 4, x: 200, y: 200, r: 40, width: 100, height: 100 }, text: 'Layer 3'}
      ]
    },
    {
      name: 'layer 4',
      visible: true,
      svgObjects: [
        { type: 'text', position: { scale: 2, x: 100, y: 430, r: 10, width: 300, height: 100 }, text: 'Layer 4'}
      ]
    }
  ],
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
  }
};


module.exports = initialImage;
