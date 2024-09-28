import RESTAPIClient from '@/app/[locale]/components/RESTAPIClient/RESTAPIClient';
import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';

describe('RESTAPIClient', () => {
  it('renders the component', () => {
    renderWithStore(<RESTAPIClient />);

    expect(screen.getByText('Variables')).toBeDefined();
    expect(screen.getByText('Headers')).toBeDefined();
    expect(screen.getByText('Body')).toBeDefined();
  });

  it('renders the request control', () => {
    renderWithStore(<RESTAPIClient />);

    expect(screen.getByText('GET')).toBeDefined();
    expect(screen.getByText('POST')).toBeDefined();
    expect(screen.getByText('PUT')).toBeDefined();
    expect(screen.getByText('DELETE')).toBeDefined();
  });

  it('renders correctly', () => {
    renderWithStore(<RESTAPIClient />);

    expect(screen.getByText('keep-alive')).toBeDefined();
    expect(screen.getByText('Connection')).toBeDefined();
    expect(screen.getByText('Accept-Encoding')).toBeDefined();
  });
});
