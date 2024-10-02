import { screen } from '@testing-library/react';

import History from '@/app/[locale]/history/page';
import { renderWithIntl } from '@/utils/testUtils';

const mockRecord = {
  client: 'test_client',
  time: 123456789,
  method: 'GET',
  url: 'test.com',
  headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
  body: '',
  variables: [],
};

describe('History', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should render correctly without data', () => {
    renderWithIntl(<History />);

    expect(screen.getByText('You haven’t executed any requests. It’s empty here. Try:')).toBeDefined();
    expect(screen.getByRole('link', { name: 'REST Client' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'REST Client' }).getAttribute('href')).toBe('/en/restapi');
    expect(screen.getByRole('link', { name: 'GraphiQL Client' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'GraphiQL Client' }).getAttribute('href')).toBe('/en/graphiql');
  });

  it('should render correctly with data', () => {
    localStorage.setItem('history_requests', JSON.stringify([mockRecord]));

    renderWithIntl(<History />);

    expect(screen.getByText('GET')).toBeDefined();
    expect(screen.getByRole('link', { name: 'test.com' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'test.com' }).getAttribute('href')).toBe('/en/test_client');
  });
});
