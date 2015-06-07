/*eslint-env jasmine */
/*global jest*/

jest.dontMock('../../src/back/Serialization');
jest.dontMock('../../src/back/Model');
jest.dontMock('../../src/back/Config');

var Serialization = require('../../src/back/Serialization');
var Model         = require('../../src/back/Model');
var Config        = require('../../src/back/Config');

describe('Serialization', () => {
  class Child extends Model {}
  class Parent extends Model {}
  var child, parent;

  beforeEach(()=> {
    Config.store({'constMapping': {'Child': Child, 'Parent': Parent}});
  })

  describe('serialization', () => {
    it('serializes attributes', () => {
      parent = new Parent({foo: 'bar'});

      expect(Serialization.write(parent)).
        toEqual(JSON.stringify(['Parent', {map: {foo: 'bar'}, errors: {}}]));
    })

    it('serializes errors', () => {
      parent = new Parent();
      parent.errors['foo'] = 'bar';

      expect(Serialization.write(parent)).
        toEqual(JSON.stringify(['Parent', {map: {}, errors: {'foo': 'bar'}}]));
    })

    describe('a model has 1-1 relation', () => {
      beforeEach(()=> {
        child = new Child({foo: 'bar'});
        parent = new Parent({child: child, bar: 'baz' });
      })

      it('serializes both', () => {
        expect(Serialization.write(parent)).
          toEqual(JSON.stringify(['Parent', {
            map: {
              child: ['Child', {map: {foo: 'bar'}, errors: {}}],
              bar: 'baz'
            },
            errors: {}
          }]));
      })
    })

    describe('a model has 1-many relation', () => {
      beforeEach(()=> {
        child = new Child({foo: 'bar'});
        parent = new Parent({children: [child], bar: 'baz' });
      })

      it('serializes both', () => {
        expect(Serialization.write(parent)).
          toEqual(JSON.stringify(['Parent', {
            map: {
              children: [
                ['Child', {map: {foo: 'bar'}, errors: {}}]
              ],
              bar: 'baz'
            },
            errors: {}
          }]));
      })
    })
  })

  describe('deserialization', () => {
    it('de-serializes attributes and errors', () => {
      parent = new Parent({foo: 'bar'});
      parent.errors = {bar: 'baz'}

      expect(Serialization.read(Serialization.write(parent))).
        toEqual(parent);
    })

    it('de-serializes 1-1 relation', () => {
      parent = new Parent();
      child = new Child();
      parent.set('child', child);

      expect(Serialization.read(Serialization.write(parent))).
        toEqual(parent);
    })

    it('de-serializes 1-many relation', () => {
      parent = new Parent();
      child = new Child();
      parent.set('child', [child]);

      expect(Serialization.read(Serialization.write(parent))).
        toEqual(parent);
    })
  })
})
