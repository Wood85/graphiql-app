import { vi } from 'vitest';
import type { Mock } from 'vitest';

import handleRequest from '@/utils/handleRequest';
import { GET, DELETE, HEAD, OPTIONS } from '@/app/[locale]/api/[method]/[url]/route';
import { POST, PUT, PATCH } from '@/app/[locale]/api/[method]/[url]/[...params]/route';

vi.mock('@/utils/handleRequest');
const mockResponse = new Promise<Response>((resolve) => {
  resolve(new Response());
});

(handleRequest as Mock).mockReturnValue(mockResponse);

const mockParams = ['param1', 'param2'];

describe('route', () => {
  it('should return a response when using GET', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'GET', url: 'https://example.com' };

    const response = await GET(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using DELETE', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'DELETE', url: 'https://example.com' };

    const response = await DELETE(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using HEAD', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'HEAD', url: 'https://example.com' };

    const response = await HEAD(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using OPTIONS', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'OPTIONS', url: 'https://example.com' };

    const response = await OPTIONS(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using POST', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'POST', url: 'https://example.com', params: mockParams };

    const response = await POST(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using PUT', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'PUT', url: 'https://example.com', params: mockParams };

    const response = await PUT(request, { params });

    expect(response).toBeInstanceOf(Response);
  });

  it('should return a response when using PATCH', async () => {
    const request = new Request('https://example.com');
    const params = { method: 'PATCH', url: 'https://example.com', params: mockParams };

    const response = await PATCH(request, { params });

    expect(response).toBeInstanceOf(Response);
  });
});
