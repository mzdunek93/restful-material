/*eslint-env jasmine */
/*global jest*/

jest.dontMock('../../src/back/createStore');
jest.dontMock('../../src/back/Config');
jest.dontMock('../../src/back/Ajax');

var createStore = require('../../src/back/createStore');
var Config = require('../../src/back/Config');
var Ajax = require('../../src/back/Ajax');

describe('createStore', () => {
  afterEach(()=> Config.opts = null);

  describe('ajax options not set', () => {
    it('throws an error', () => {
      expect(()=> createStore()).
        toThrow("The App should be configured with the ajax options");
    })
  })

  describe('ajax options set', () => {
    it('does not throw an error', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      expect(()=> createStore()).not.
        toThrow("The App should be configured with the ajax options");
    })

    it('returns a store with ajax setup', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      var ajax = createStore().ajax;
      expect(ajax instanceof Ajax).toBe(true);
      expect(ajax.url).toEqual('http://localhost');
    })

    it('returns a store with ajax setup', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      expect(createStore().ajax instanceof Ajax).toBe(true);
    })

    it('sets up passed functions', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      expect(createStore({get: ()=> 'get function'}).get()).toEqual(
        'get function'
      );
    })

    it('does not allow to define ajax function', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      expect(()=> createStore({ajax: ()=> {}})).
        toThrow("Cannot define a function called ajax.");
    })

    it('is possible to use ajax object in the function body', () => {
      Config.store({ajax: {url: 'http://localhost'}});

      expect(createStore({get: function(){ return this.ajax.url }}).get()).
        toEqual('http://localhost');
    })
  })
})
