import Row from '@/app/[locale]/components/Row/Row';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';
import storeMock from './mockStore';

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
      <Provider store={storeMock}>
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
