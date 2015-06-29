/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/RestField');
jest.dontMock('../../src/back/Model');

import { utils, renderIntoDocument } from "../helper";
import RestField from "../../src/front/RestField";
import Model from "../../src/back/Model";

describe('the RestField component', () => {
  var component, model;

  beforeEach(() => {
    model = new Model({foo: 'bar'});
  })

  describe('reflecting model attribute', () => {
    it('renders the value', () => {
      component = renderIntoDocument(RestField, {
        model: model, attribute: 'foo'
      })
      var inputs = utils.scryRenderedDOMComponentsWithTag(component, 'input');

      expect(inputs[0].getDOMNode().value).toEqual('bar');
    })

    it('renders error text if an error is present', () => {
      model.errors.foo = 'Error foo';

      component = renderIntoDocument(RestField, {
        model: model, attribute: 'foo'
      })
      var divs = utils.scryRenderedDOMComponentsWithTag(component, 'div');

      expect(divs.filter((div)=>{
        return div.getDOMNode().textContent === "Error foo"
      }).length).not.toEqual(0);
    })
  })
})
