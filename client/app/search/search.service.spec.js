'use strict';

describe('Service: search', function () {

  // load the service's module
  beforeEach(module('quickCooking3UiApp'));

  // instantiate service
  var search;
  beforeEach(inject(function (_search_) {
    search = _search_;
  }));

  it('should do something', function () {
    expect(!!search).toBe(true);
  });

});
