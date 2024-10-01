import { vi } from 'vitest';

import handleRequest from '@/utils/handleRequest';
import { GRAPHQL, STATUS_OK, STATUS_SERVER_ERROR } from '@/utils/constants';

describe('handleRequest', () => {
  it('should return correct data for the HEAD request', async () => {
    const request = new Request('https://test.com', { method: 'HEAD' });
    const params = {
      method: 'HEAD',
      url: btoa('https://test.com'),
    };

    const response = await handleRequest(request, { params });

    expect(response.status).toBe(STATUS_OK);
    expect(response.ok).toBe(true);
  });

  it('should return correct data for the text content', async () => {
    const request = new Request('https://test.com/text', { method: 'GET' });
    const params = {
      method: 'GET',
      url: btoa('https://test.com/text'),
    };

    const response = await handleRequest(request, { params });

    const data = await response.json();

    expect(data.body).toEqual({ text: 'Test text' });
  });

  it('should return correct data for the JSON content', async () => {
    const request = new Request('https://test.com/json', { method: 'GET' });
    const params = {
      method: 'GET',
      url: btoa('https://test.com/json'),
    };

    const response = await handleRequest(request, { params });

    const data = await response.json();

    expect(data.body).toEqual({ test: 'success' });
  });

  it('should return correct data for the GRAPHQL method', async () => {
    const request = new Request('https://test.com/json', { method: GRAPHQL });
    const params = {
      method: GRAPHQL,
      url: btoa('https://test.com/json'),
    };

    const response = await handleRequest(request, { params });

    const data = await response.json();

    expect(data.body).toEqual({ test: 'success' });
  });

  it('should return correct data for the image content', async () => {
    const request = new Request('https://test.com/image', { method: 'GET' });
    const params = {
      method: 'GET',
      url: btoa('https://test.com/image'),
    };

    const response = await handleRequest(request, { params });

    const data = await response.json();

    expect(data.body).toEqual({ url: 'https://test.com/image', width: 64, height: 64 });
  });

  it('should handle errors with message', async () => {
    const request = new Request('http://test.com', { method: 'GET' });
    const params = {
      method: 'GET',
      url: btoa('http://test.com'),
    };

    global.fetch = vi.fn(async () => {
      const result = await Promise.reject(new Error('Test error'));
      return result as Response;
    });

    const response = await handleRequest(request, { params });

    expect(response.status).toBe(STATUS_SERVER_ERROR);
    expect(await response.json()).toEqual({ error: 'Test error' });
  });

  it('should handle errors without message', async () => {
    const request = new Request('http://test.com', { method: 'GET' });
    const params = {
      method: 'GET',
      url: btoa('http://test.com'),
    };

    global.fetch = vi.fn(async () => {
      const result = await Promise.reject(new Error(''));
      return result as Response;
    });

    const response = await handleRequest(request, { params });

    expect(response.status).toBe(STATUS_SERVER_ERROR);
    expect(await response.json()).toEqual({ error: 'Internal Server Error' });
  });
});
