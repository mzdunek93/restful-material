/*
jest.dontMock('../../src/front/Table');
jest.dontMock('../../src/back/model');

import Table from "../../src/front/Table";
import Model from "../../src/back/Model";
import React from 'react/addons';
var utils = React.addons.TestUtils;

describe('the Table component', () => {
  beforeEach(() => {
    spec = {'Foo title': 'foo'};
    resources = [new Model({foo: 'bar'}), new Model({foo: 'bar'})];
    Table = utils.renderIntoDocument(React.createElement(Table,
                                                 {spec: spec,
                                                  resources: resource}));
  })

  it('renders the row for each data', () => {
    var body = utils.findRenderedDOMComponentWithTag(Table, 'tbody');
    console.log(body)
  })
})
*/
