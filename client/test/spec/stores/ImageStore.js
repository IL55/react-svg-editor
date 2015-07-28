'use strict';

describe('ImageStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/ImageStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
