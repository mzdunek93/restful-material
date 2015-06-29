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
        data: {'Foo title': 'foo'},
        headers: {},
        resources: [1, 2, 3, 4, 5, 6].map((i)=> new Model({foo: "bar" + i}))
      })
    })

    it('renders the row for each data', () => {
      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');

      expect(trs.map((tr)=> tr.getDOMNode().textContent).splice(2)).
        toEqual(['bar1', 'bar2', 'bar3', 'bar4', 'bar5']);
    })

    it('renders the last row when I click to the next page', () => {
      var pageLinks = utils.scryRenderedDOMComponentsWithClass(component, 'pageLinks');
      utils.Simulate.click(pageLinks[1].getDOMNode().querySelector('a'));

      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
      expect(trs[2].getDOMNode().textContent).toEqual('bar6');
    })
  })

  describe('headers', () => {
    it('renders the header row with title', () => {
      var component = renderIntoDocument(Table, {
        data: {'Foo title': 'foo'}, resources: [new Model({foo: 'bar'})]
      });

      var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
      expect(trs[0].getDOMNode().textContent).toEqual('Foo title');
    })

    describe('there is a intlKeyPrefix', () => {
      it('renders the header row with translated title', () => {
        var component = renderIntoDocument(Table, {
          messages: {'fooTitle': 'Translated foo title'},
          data: {'fooTitle': 'foo'},
          resources: [new Model({foo: 'bar'})]
        });

        var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
        expect(trs[0].getDOMNode().textContent).
          toEqual('Translated foo title');
      })
    })

    describe('there is a header props', () => {
      it('does not render filter', () => {
        var component = renderIntoDocument(Table, {
          data: {'Foo title': 'foo'},
          resources:  [new Model({foo: 'bar'})],
          headers: {'Foo title': function(){ return 'no filter'}}
        });

        var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
        expect(trs[1].getDOMNode().querySelector('input')).toBe(null);
        expect(trs[1].getDOMNode().textContent).toBe('no filter');
      })
    })

    describe('there is no header props', () => {
      it('renders filter', () => {
        var component = renderIntoDocument(Table, {
          data: {'Foo title': 'foo'}, resources: [new Model({foo: 'bar'})]
        });

        var trs = utils.scryRenderedDOMComponentsWithTag(component, 'tr');
        expect(trs[1].getDOMNode().querySelector('input').type).toEqual('text');
      })
    })
  })
})
