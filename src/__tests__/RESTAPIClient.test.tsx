import RESTAPIClient from '@/app/[locale]/components/RESTAPIClient/RESTAPIClient';
import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import messages from '../../messages/en.json';

const locale = 'en';

describe('RESTAPIClient', () => {
  it('renders the component', () => {
    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <RESTAPIClient />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('Variables')).toBeDefined();
    expect(screen.getByText('Headers')).toBeDefined();
    expect(screen.getByText('Body')).toBeDefined();
  });

  it('renders the request control', () => {
    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <RESTAPIClient />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('GET')).toBeDefined();
    expect(screen.getByText('POST')).toBeDefined();
    expect(screen.getByText('PUT')).toBeDefined();
    expect(screen.getByText('DELETE')).toBeDefined();
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <RESTAPIClient />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('keep-alive')).toBeDefined();
    expect(screen.getByText('Connection')).toBeDefined();
    expect(screen.getByText('Accept-Encoding')).toBeDefined();
  });
});
