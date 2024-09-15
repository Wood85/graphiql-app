import { type IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import handleRequest from '@/utils/handleRequest';
import { describe, expect, it } from 'vitest';

describe('handleRequest', () => {
  it('should handle errors correctly', async () => {
    const request = new Request('https://graphiql.com');
    const params: IUrlRouteParams = {
      params: {
        method: 'GET',
        url: 'https://graphiql.com',
        params: [''],
      },
    };
    try {
      await handleRequest(request, params);
      throw new Error();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
