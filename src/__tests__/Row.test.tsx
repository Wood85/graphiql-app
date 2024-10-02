import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import Row from '@/app/[locale]/components/Row/Row';

const row = {
  key: 'Content-Type',
  value: 'application/json',
  checked: true,
  userDefined: true,
};

describe('Row', () => {
  it('should render key and value correctly', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <Row type='headers' row={row} updateRowState={() => {}} />
        </tfoot>
      </table>,
    );

    expect(screen.getByText('Content-Type')).toBeDefined();
    expect(screen.getByText('application/json')).toBeDefined();
  });
});
