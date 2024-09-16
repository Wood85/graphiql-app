import { vi } from 'vitest';

import getRequestConfig from '../i18n/request';

vi.mock('../i18n/request', () => ({
  default: vi.fn().mockImplementationOnce(() => ({
    messages: {},
  })),
}));

describe('request.ts', () => {
  it('should return a valid request config', async () => {
    const locale = 'en';
    const getRequestConfigMock = vi.mocked(getRequestConfig);
    getRequestConfigMock.mockImplementationOnce(() => ({
      messages: {},
    }));
    const config = await getRequestConfig({ locale });
    expect(config).toHaveProperty('messages');
  });
});
