/*eslint-env jasmine */
/*global jest*/

jest.dontMock('../../src/back/Serialization');
jest.dontMock('../../src/back/Model');

var Serialization = require('../../src/back/Serialization');
var Model         = require('../../src/back/Model');

describe('Serialization', () => {
  class Child extends Model {
    klass() { return "Child" }
  }
  class GrandChild extends Model {
    klass() { return "GrandChild" }
  }
  var child, models;

  beforeEach(()=> {
    child = new Child();
    models = {'Child': Child, 'GrandChild': GrandChild}
  })

  // it('serializes', () => {
  //   child.set('foo', 'bar');

  //   expect(Serialization.write(child)).
  //     toEqual(JSON.stringify(['Child', {map: {foo: 'bar'}, errors: {}}]));
  // })

  describe('deserialization', () => {
    // it('de-serializes map', () => {
    //   child.set('foo', 'bar');

    //   expect(Serialization.read(Serialization.write(child), models)).
    //     toEqual(child);
    // })

    // it('de-serializes errors', () => {
    //   child.errors = {foo: 'bar'}

    //   expect(Serialization.read(Serialization.write(child), models).errors).
    //     toEqual({foo: 'bar'});
    // })

    // it('de-serializes 1-1 relation', () => {
    //   var grandChild = new GrandChild({bar: 'baz'});
    //   child.set('grandChild', grandChild);

    //   expect(Serialization.read(Serialization.write(child), models)).
    //     toEqual(child);
    // })

    it('de-serializes 1-many relation', () => {
      var grandChild = new GrandChild({bar: 'baz'});
      child.set('grandChild', [grandChild]);

      expect(Serialization.read(Serialization.write(child), models)).
        toEqual(child);
    })
  })
})
