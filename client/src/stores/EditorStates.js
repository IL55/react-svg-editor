'use strict';
import keyMirror from 'react/lib/keyMirror';

/**
 * svg image editing state
 * some of the actions has a number of user manipulations
 * like: user click on rectangle: means that he wants to start to add rectangles
 * so editor should switch to new state like "ADD_RECT"
 * and some operation like "on click" has different context
 *
 * or user click polygons button: ready for add polygons
 * when image stays in different edit states
 * @type {Number}
 */
export default keyMirror({
  SELECT_OBJ: null,
  ADD_RECT: null,
  ADD_RECT_FIRST_POINT_ADDED: null,
  ADD_RECT_SECOND_POINT_ADDED: null,
  ADD_TEXT: null,
  ADD_POLYGON: null,
  ADD_POLYGON_FIRST_TWO_POINTS_ADDED: null,
  ADD_POLYGON_NEXT_POINT_ADDED: null,
  EDIT_POLYGON_POINT: null,
  EDIT_POLYGON_CURVE_POINT: null,
  ADD_CURVE_TO_POLYGON: null
});
