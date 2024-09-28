import { Table } from '@/app/[locale]/components/Response/Table/Table';
import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import messages from '../../messages/en.json';

const locale = 'en';

describe('Table component', () => {
  it('renders table with headers and rows', () => {
    const headers = { key: 'Accept', value: '*/*' };
    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Table headers={headers} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText('Accept')).toBeDefined();
    expect(screen.getByText('*/*')).toBeDefined();
  });

  it('renders table with translated headers', () => {
    const headers = { key: 'Accept', value: '*/*' };

    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Table headers={headers} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('key')).toBeDefined();
    expect(screen.getByText('value')).toBeDefined();
  });
});
