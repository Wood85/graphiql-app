import GraphiQLClient from '@/app/[locale]/components/GraphiQLClient/GraphiQLClient';
import { store } from '@/store/store';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import messages from '../../messages/en.json';

const locale = 'en';

describe('GraphiQLClient', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Headers')).toBeInTheDocument();
  });

  it('display text', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Set')).toBeInTheDocument();
      expect(getByText('Send')).toBeInTheDocument();
      expect(getByText('No schema available')).toBeInTheDocument();
      expect(getByText('Schema')).toBeInTheDocument();
    });
  });
});
