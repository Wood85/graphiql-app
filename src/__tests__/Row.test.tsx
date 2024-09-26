import Row from '@/components/Row/Row';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithStore } from '../utils/testUtils';

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
