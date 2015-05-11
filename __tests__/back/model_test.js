jest.dontMock('../../src/back/model');

import Model from "../../src/back/model"

describe('Model', () => {
  beforeEach(() => {
    model = new Model({foo: 'bar'});
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
})
