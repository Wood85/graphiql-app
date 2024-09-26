import RowEditor from '@/components/RowEditor/RowEditor';
import { headers } from '@/store/reducers/restFullSlice';
import { store } from '@/store/store';
import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithStore } from '../utils/testUtils';

const ARR_LENGTH = 2;
const EMPTY_ARR = 0;

const newHeaders = [
  {
    key: 'Content-Type',
    value: 'application/json',
    checked: true,
    userDefined: true,
  },
  {
    key: 'Accept',
    value: '*/*',
    checked: true,
    userDefined: true,
  },
];

describe('RowEditor', () => {
  it('should render row editor', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='headers' />
        </tfoot>
      </table>,
    );

    expect(screen.getByTestId('row_editor')).toBeDefined();
  });

  it('change the state when dispatching "headers" ', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='headers' />
        </tfoot>
      </table>,
    );

    act(() => {
      store.dispatch(headers(newHeaders));
    });

    expect(store.getState().rest.headers.length).toBe(ARR_LENGTH);

    act(() => {
      store.dispatch(headers([]));
    });

    expect(store.getState().rest.headers.length).toBe(EMPTY_ARR);
  });

  describe('RowEditor', () => {
    it('should render correctly', () => {
      renderWithStore(
        <table role='grid'>
          <tfoot>
            <RowEditor type='headers' />
          </tfoot>
        </table>,
      );

      expect(screen.getByTestId('row_editor')).toBeDefined();
    });

    it('change the state', () => {
      renderWithStore(
        <table role='grid'>
          <tfoot>
            <RowEditor type='headers' />
          </tfoot>
        </table>,
      );

      act(() => {
        store.dispatch(headers(newHeaders));
      });

      expect(store.getState().rest.headers.length).toBe(ARR_LENGTH);

      act(() => {
        store.dispatch(headers([]));
      });

      expect(store.getState().rest.headers.length).toBe(EMPTY_ARR);
    });
  });
});
