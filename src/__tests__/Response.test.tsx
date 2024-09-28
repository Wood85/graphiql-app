import { Response, type IProps } from '@/app/[locale]/components/Response/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { store } from '@/store/store';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import messages from '../../messages/en.json';

const locale = 'en';
describe('Response component', () => {
  const props: IProps = {
    method: TRequestMethod.GET,
    response: {
      body: 'Loading...',
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Response {...props} />
        </NextIntlClientProvider>
      </Provider>,
    );
    expect(getByText('Loading...')).toBeDefined();
  });
});
