import * as indexModule from '@controllers/common/index';

describe('index', () => {
  it('should import appVersionController', () => {
    expect(indexModule.appVersionController).toBeDefined();
  });
});
