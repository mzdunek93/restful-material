jest.dontMock('../../src/front/Table');
jest.dontMock('../../src/back/Model');

import Table from "../../src/front/Table";
import Model from "../../src/back/Model";
import React from 'react/addons';
var utils = React.addons.TestUtils;

describe('the Table component', () => {
  var component;

  describe('pagination', () => {
    beforeEach(() => {
      var spec = {'Foo title': 'foo'};
      var resources = [1, 2, 3, 4, 5, 6].map((i)=> new Model({foo: "bar" + i}));
      component = utils.renderIntoDocument(React.createElement(Table,
                                                               {spec: spec,
                                                                resources: resources}));
    })

    it('renders the header row', () => {
      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
      expect(trs[0].getDOMNode().textContent).toEqual('Foo title');
    })

    it('renders the row for each data', () => {
      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');

      expect(trs.map((tr)=> tr.getDOMNode().textContent).splice(2)).
        toEqual(['bar1', 'bar2', 'bar3', 'bar4', 'bar5']);
    })

    it('renders the last row when I click to the next page', () => {
      console.log(1)
      var pageLinks = utils.scryRenderedDOMComponentsWithClass(component, 'pageLinks');
      utils.Simulate.click(pageLinks[1].getDOMNode().querySelector('a'));

      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
      expect(trs[2].getDOMNode().textContent).toEqual('bar6');
    })
  })
})
