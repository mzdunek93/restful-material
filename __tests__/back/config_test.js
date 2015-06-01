/*eslint-env jasmine */

jest.dontMock('../../src/back/config');

import config from '../../src/back/config';

describe('Config', () => {
  it('can store passed options', () => {
    config.store({ajax: 1});
    expect(config.opts).toEqual({ajax: 1});
  })

  it('can return an option', () => {
    config.store({ajax: 1});
    expect(config.get('ajax')).toEqual(1);
  })
})
