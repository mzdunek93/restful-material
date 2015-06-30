/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/RestCheckbox');
jest.dontMock('../../src/back/Model');

import { utils, renderIntoDocument } from "../helper";
import RestCheckbox from "../../src/front/RestCheckbox";
import Model from "../../src/back/Model";

describe('the RestCheckbox component', () => {
  var component, model;

  beforeEach(() => {
    model = new Model({foo: true});
  })

  describe("reflecting the model's attribute", () => {
    it('renders checked checkbox when value it true', () => {
      model.set('foo', true);
      component = renderIntoDocument(RestCheckbox, {
        model: model, attribute: 'foo'
      })
      var inputs = utils.scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[0].getDOMNode().checked).toEqual(true);
    })

    it('renders unchecked checkbox when value it false', () => {
      model.set('foo', false);
      component = renderIntoDocument(RestCheckbox, {
        model: model, attribute: 'foo'
      })
      var inputs = utils.scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[0].getDOMNode().checked).toEqual(false);
    })
  })
})
