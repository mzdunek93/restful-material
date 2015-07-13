/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/RestDropDownMenu');
jest.dontMock('../../src/back/Model');

import { utils, renderIntoDocument } from "../helper";
import RestDropDownMenu from "../../src/front/RestDropDownMenu";
import Model from "../../src/back/Model";

describe('the RestDropDownMenu component', () => {
  describe('rendering label', () => {
    it('renders the label', () => {
      var model = new Model({foo: 'bar'});
      var component = renderIntoDocument(RestDropDownMenu, {
        model: model, attribute: 'foo', items: ['bar', 'baz'], label: 'A label'
      })
      var labels = utils.scryRenderedDOMComponentsWithTag(component, 'label');

      expect(labels[0].getDOMNode().textContent).toEqual('A label');
    })
  })
})
