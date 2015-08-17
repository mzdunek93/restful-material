/* eslint-env jasmine */
/* globals jest */

jest.dontMock('../../src/front/CountriesSelectField');
jest.dontMock('../../src/back/Model');

import CountriesSelectField from "../../src/front/CountriesSelectField";

describe('the CountriesSelectField component', () => {
  describe('statics', () => {
    it('can return all alfa2 countries code', () => {
      var codes = CountriesSelectField.alfa2CountriesCodes();
      expect(codes.length).toEqual(249);
      expect(codes[0]).toEqual('AF');
    })

    it('can return all alfa3 countries code', () => {
      var codes = CountriesSelectField.alfa3CountriesCodes();
      expect(codes.length).toEqual(249);
      expect(codes[0]).toEqual('AFG');
    })
  })
})
