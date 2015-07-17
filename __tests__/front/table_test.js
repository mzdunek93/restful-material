/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/Table');
jest.dontMock('../../src/back/Model');

import Table from "../../src/front/Table";
import Model from "../../src/back/Model";

import { utils, renderIntoDocument } from "../helper";

describe('the Table component', () => {
  var component;

  describe('pagination', () => {
    beforeEach(() => {
      component = renderIntoDocument(Table, {
        spec: {'Foo title': 'foo'},
        headers: {},
        resources: [1, 2, 3, 4, 5, 6].map((i)=> new Model({foo: "bar" + i}))
      })
    })

    it('renders the row for each data', () => {
      var trs = utils.scryRenderedDOMComponentsWithClass(component, 'mui-table-row');

      expect(trs.map((tr)=> tr.getDOMNode().textContent)).
        toEqual(['bar1', 'bar2', 'bar3', 'bar4', 'bar5']);
    })

    it('renders the last row when I click to the next page', () => {
      var pageLinks = utils.scryRenderedDOMComponentsWithClass(component, 'pageLinks');
      utils.Simulate.click(pageLinks[1].getDOMNode().querySelector('a'));

      var trs = utils.scryRenderedDOMComponentsWithClass(component, 'mui-table-row');
      expect(trs[0].getDOMNode().textContent).toEqual('bar6');
    })
  })

  describe('headers', () => {
    var firstHeader = (component) => {
      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
      return trs[0].getDOMNode().querySelector('th:nth-child(2)');
    }

    it('renders the header row with title', () => {
      var component = renderIntoDocument(Table, {
        spec: {'Foo title': 'foo'}, resources: [new Model({foo: 'bar'})]
      });

      expect(firstHeader(component).textContent.trim()).toEqual('Foo title');
    })

    describe('there is a intlKeyPrefix', () => {
      it('renders the header row with translated title', () => {
        var component = renderIntoDocument(Table, {
          messages: {'fooTitle': 'Translated foo title'},
          spec: {'fooTitle': 'foo'},
          resources: [new Model({foo: 'bar'})]
        });

        expect(firstHeader(component).textContent.trim()).
          toEqual('Translated foo title');
      })
    })

    describe('there is a header props', () => {
      it('does not render filter', () => {
        var component = renderIntoDocument(Table, {
          spec: {'Foo title': 'foo'},
          resources:  [new Model({foo: 'bar'})],
          headers: {'Foo title': function(){ return 'no filter'}}
        });

        var header = firstHeader(component);
        expect(header.querySelector('input')).toBe(null);
        expect(header.textContent.trim()).toBe('Foo title  no filter');
      })
    })

    describe('there is no header props', () => {
      it('renders filter', () => {
        var component = renderIntoDocument(Table, {
          spec: {'Foo title': 'foo'}, resources: [new Model({foo: 'bar'})]
        });

        expect(firstHeader(component).querySelector('input').type).toEqual('text');
      })
    })
  })
})
