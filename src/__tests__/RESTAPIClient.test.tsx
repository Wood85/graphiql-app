import { vi } from 'vitest';
import { fireEvent, getByText, screen, waitFor } from '@testing-library/react';

import { renderWithIntl, renderWithStore } from '@/utils/testUtils';
import RESTAPIClient from '@/app/[locale]/components/RESTAPIClient/RESTAPIClient';

const ONE = 1;

describe('RESTAPIClient', () => {
  it('should render correctly', () => {
    renderWithStore(<RESTAPIClient />);

    expect(screen.getByText('GET')).toBeDefined();
    expect(screen.getByText('POST')).toBeDefined();
    expect(screen.getByText('PUT')).toBeDefined();
    expect(screen.getByText('DELETE')).toBeDefined();
    expect(screen.getByText('Variables')).toBeDefined();
    expect(screen.getByText('Headers')).toBeDefined();
    expect(screen.getByText('Body')).toBeDefined();
    expect(screen.getByText('keep-alive')).toBeDefined();
    expect(screen.getByText('Connection')).toBeDefined();
    expect(screen.getByText('Accept-Encoding')).toBeDefined();
  });

  it('handleSubmit sends request with correct method and URL', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    const { getByTestId } = renderWithStore(<RESTAPIClient />);

    const formElement = getByTestId('formElement');
    const methodInput = getByTestId('methodInput');
    const urlInput = getByTestId('urlInput');
    const method = 'HEAD';

    fireEvent.change(methodInput, { target: { value: method } });
    fireEvent.change(urlInput, { target: { value: 'https://test.com' } });

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(ONE);
    });

    const origin = 'http://localhost:3000';
    const lang = '';
    const currentRoute = '';
    const targetUrl = btoa('https://test.com').replace(/\//g, '+');

    const url =
      `${origin}/${lang}/${currentRoute}/${method}/${targetUrl}` +
      `?Accept=*%2F*&Accept-Encoding=gzip%2C+deflate%2C+br&Connection=keep-alive`;

    expect(fetchSpy).toHaveBeenCalledWith(url, { method });
  });

  it('handleSubmit handles errors correctly', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    fetchSpy.mockRejectedValueOnce(new Error('Test error'));

    const { getByTestId } = renderWithStore(<RESTAPIClient />);

    const formElement = getByTestId('formElement');

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(screen.getByText(/Test error/)).toBeInTheDocument();
    });
  });
});
