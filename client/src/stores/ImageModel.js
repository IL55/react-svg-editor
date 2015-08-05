'use strict';

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
    Immutable.Map({
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
      svgObjects: Immutable.List([
        Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 200, y: 200, r: 10, width: 220, height: 250 }), fill: 'green' }),
        Immutable.Map({ type: 'photo', position: Immutable.Map({ scale: 1, x: 340, y: 100, r: 10, width: 50, height: 50 }), src: 'images/photos/schoolgirl.jpg'})
      ])
    }),
    Immutable.Map({
      name: 'Layer2',
      visible: true,
      maskAdded: 'Layer3mask',
      svgObjects: Immutable.List([
         Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }), fill: 'blue' })
      ])
    }),
    Immutable.Map({
      name: 'Layer3',
      visible: false,
      svgObjects: Immutable.List([
         Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }), fill: 'white' }),
         Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 220, y: 220, r: 100, width: 100, height: 100 }), fill: 'black' })
      ])
    }),
    Immutable.Map({
      name: 'Layer3mask',
      visible: true,
      mask: true,
      svgObjects: Immutable.List([
         Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 220, y: 220, r: 10, width: 250, height: 200 }), fill: 'white' }),
         Immutable.Map({ type: 'rect', position: Immutable.Map({ scale: 1, x: 220, y: 220, r: 100, width: 100, height: 100 }), fill: 'black' })
      ])
    })
  ]),
  /**
   * create empty svg object specified type
   * @param  {string} type  - of the object (text/rect)
   * @return {object} new svg object
   */
  emptyObjectOfType: function(type, attrs) {
    var svgObject = Immutable.Map({ type: type, position: Immutable.Map({ x: 100, y: 30, r: 0, width: 100, height: 50 }) });
    if (type === 'rect') {
      svgObject = svgObject.set('fill', 'red');
    }
    if (type === 'text') {
      svgObject = svgObject.set('text', 'Text');
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
    return Immutable.Map({
      name: name,
      visible: true,
      svgObjects: Immutable.List([])
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
