import Row from '@/components/Row/Row';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import store from './mockStore';
import messages from '../../messages/en.json';

const locale = 'en';

const row = {
  key: 'Content-Type',
  value: 'application/json',
  checked: true,
  userDefined: true,
};

describe('Row', () => {
  it('should render key and value correctly', () => {
    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <table role='grid'>
            <tfoot>
              <Row type='headers' row={row} updateRowState={() => {}} />
            </tfoot>
          </table>
        </NextIntlClientProvider>
        ,
      </Provider>,
    );

    expect(screen.getByText('Content-Type')).toBeDefined();
    expect(screen.getByText('application/json')).toBeDefined();
  });
});
