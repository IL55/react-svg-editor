'use strict';

describe('TestStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/TestStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
