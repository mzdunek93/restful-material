/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/CountriesDropDownMenu');
jest.dontMock('../../src/back/Model');

import CountriesDropDownMenu from "../../src/front/CountriesDropDownMenu";

describe('the CountriesDropDownMenu component', () => {
  describe('statics', () => {
    it('can return all alfa2 countries code', () => {
      var codes = CountriesDropDownMenu.alfa2CountriesCodes();
      expect(codes.length).toEqual(249);
      expect(codes[0]).toEqual('AF');
    })

    it('can return all alfa3 countries code', () => {
      var codes = CountriesDropDownMenu.alfa3CountriesCodes();
      expect(codes.length).toEqual(249);
      expect(codes[0]).toEqual('AFG');
    })
  })
})
