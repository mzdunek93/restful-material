/*eslint-env jasmine */
/*global jest*/

jest.dontMock('../../src/back/Model');

var Model = require('../../src/back/Model');

describe('Model', () => {
  beforeEach(() => {
    model = new Model({foo: 'bar'}); /*global model */
  })

  describe('costructing', () => {
    it('stores the passed map', () => {
      expect(model.map).toEqual({foo: 'bar'});
    })

    it('initializes errors map', () => {
      expect(model.errors).toEqual({});
    })
  })

  describe('set', () => {
    it('sets the specified key to the passed value', () => {
      model.set('name', 'Adam')
      expect(model.map.name).toEqual('Adam');
    })
  })

  describe('get', () => {
    it('gives back the stored value', () => {
      expect(model.get('foo')).toEqual('bar');
    })
  })

  describe('toObject', () => {
    it('gives back the attributes map', () => {
      expect(model.toObject()).toEqual({foo: 'bar'});
    })
  })

  describe('merge', () => {
    it('merges attributes of the second model', () => {
      model.merge(new Model({name: 'Adam'}));
      expect(model.map).toEqual({foo: 'bar', name: 'Adam'});
    })
  })

  describe('update', () => {
    it('update the attributes with the passed map of new attributes', () => {
      model.update({name: 'Adam'})
      expect(model.map).toEqual({foo: 'bar', name: 'Adam'});
    })
  })

  describe('errorMessages', () => {
    it('stores the passed map', () => {
      model.errors['name'] = ['Is missing']
      expect(model.errorMessages()).toEqual(['name: Is missing']);
    })
  })

  describe('isBlank', () => {
    it('returns true if the attribute is null', () => {
      model.set('bar', null)
      expect(model.isBlank('bar')).toBe(true);
    })

    it('returns true if the attribute is undefined', () => {
      expect(model.isBlank('bar')).toBe(true);
    })

    it('returns true if the attribute is an empty string', () => {
      model.set('bar', '')
      expect(model.isBlank('bar')).toBe(true);
    })

    it('returns false if the attribute is set', () => {
      model.set('bar', 'a value')
      expect(model.isBlank('bar')).toBe(false);
    })
  })

  describe('setDefault', () => {
    it('it sets a value when the attribute is blank', () => {
      model.setDefault('bar', 'a value')
      expect(model.get('bar')).toEqual('a value');
    })

    it('it sets a value when the attribute is blank', () => {
      model.setDefault('foo', 'a value')
      expect(model.get('bar')).toNotEqual('a value');
    })
  })
})
