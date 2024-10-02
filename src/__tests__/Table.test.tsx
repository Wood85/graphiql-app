import { Table } from '@/app/[locale]/components/Response/Table/Table';
import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';

describe('Table component', () => {
  it('renders table with headers and rows', () => {
    const headers = { key: 'Accept', value: '*/*' };
    renderWithStore(<Table headers={headers} />);

    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText('Accept')).toBeDefined();
    expect(screen.getByText('*/*')).toBeDefined();
  });

  it('renders table with translated headers', () => {
    const headers = { key: 'Accept', value: '*/*' };

    renderWithStore(<Table headers={headers} />);

    expect(screen.getByText('key')).toBeDefined();
    expect(screen.getByText('value')).toBeDefined();
  });
});
