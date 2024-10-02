import { vi } from 'vitest';
import { notFound } from 'next/navigation';
import getRequestConfig from '@/i18n/request';
import messages from '../../messages/en.json';

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((fn) => fn),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('getRequestConfig', () => {
  it('should return messages for a valid locale', async () => {
    const locale = 'en';

    const result = await getRequestConfig({ locale });

    expect(result).toEqual({ messages });
    expect(notFound).not.toHaveBeenCalled();
  });

  it('should call notFound for an invalid locale', async () => {
    const locale = 'unknown';

    let result;

    try {
      result = await getRequestConfig({ locale });
    } catch (e) {
      expect(result).toBeUndefined();
      expect(notFound).toHaveBeenCalled();
    }
  });
});
