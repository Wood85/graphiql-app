import { Docs } from '@/app/[locale]/components/GraphiQLClient/Docs/Docs';
import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { type IntrospectionQuery } from 'graphql';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import messages from '../../messages/en.json';

const locale = 'en';

describe('Docs component', () => {
  it('renders the component', () => {
    const schema: IntrospectionQuery = {
      __schema: {
        types: [],
        queryType: {
          name: 'Query',
          kind: 'OBJECT',
        },
        mutationType: null,
        subscriptionType: null,
        directives: [],
      },
    };

    render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Docs schema={schema} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('Schema')).toBeDefined();
  });
});
