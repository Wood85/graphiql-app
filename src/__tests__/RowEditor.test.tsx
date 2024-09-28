import RowEditor from '@/app/[locale]/components/RowEditor/RowEditor';
import { headers } from '@/store/reducers/restFullSlice';
import { store } from '@/store/store';
import { act, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';
import storeMock from './mockStore';

const ARR_LENGTH = 2;
const EMPTY_ARR = 0;

const locale = 'en';

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
    render(
      <Provider store={storeMock}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <table role='grid'>
            <tfoot>
              <RowEditor type='headers' />
            </tfoot>
          </table>
        </NextIntlClientProvider>
        ,
      </Provider>,
    );

    expect(screen.getByTestId('row_editor')).toBeDefined();
  });

  it('change the state when dispatching "headers" ', () => {
    render(
      <Provider store={storeMock}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <table role='grid'>
            <tfoot>
              <RowEditor type='headers' />
            </tfoot>
          </table>
        </NextIntlClientProvider>
        ,
      </Provider>,
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
      render(
        <Provider store={storeMock}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <table role='grid'>
              <tfoot>
                <RowEditor type='headers' />
              </tfoot>
            </table>
          </NextIntlClientProvider>
          ,
        </Provider>,
      );

      expect(screen.getByTestId('row_editor')).toBeDefined();
    });

    it('change the state', () => {
      render(
        <Provider store={storeMock}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <table role='grid'>
              <tfoot>
                <RowEditor type='headers' />
              </tfoot>
            </table>
          </NextIntlClientProvider>
        </Provider>,
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
