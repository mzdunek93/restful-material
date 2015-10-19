/*eslint-env jasmine */
/*global jest */

jest.dontMock('../../node_modules/react-intl');
jest.dontMock('../../src/back/Intl');

var React = require('react/addons');
var utils = React.addons.TestUtils;

const Intl = require("../../src/back/Intl");

describe('Intl', () => {
  describe('constructor', () => {
    it('sets up the messages', () => {
      var intl = new Intl({'en-GB': {foo: 'bar'}}, 'en-GB');
      expect(intl.getMessages()).toEqual({foo: 'bar'});
    })
  })
})
