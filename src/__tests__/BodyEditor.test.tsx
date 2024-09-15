import { BodyEditor } from '@/app/[locale]/components/RESTAPIClient/BodyEditor/BodyEditor';
import { store } from '@/store/store';
import { fireEvent, render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';

const ONE = 1;
describe('BodyEditor component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BodyEditor setBody={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders headers editor by default', () => {
    const { getByText } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BodyEditor setBody={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );
    expect(getByText('Headers')).toBeDefined();
  });

  it('switches to body editor', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BodyEditor setBody={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );
    const bodyButton = getByRole('button', { name: 'Body' });
    fireEvent.click(bodyButton);
    expect(getByText('Body')).toBeDefined();
  });

  it('switches to variables editor', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BodyEditor setBody={() => {}} />
        </NextIntlClientProvider>
      </Provider>,
    );
    const variablesButton = getByRole('button', { name: 'Variables' });
    fireEvent.click(variablesButton);
    expect(getByText('Variables')).toBeDefined();
  });
});
