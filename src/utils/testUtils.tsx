import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import storeMock from '../__tests__/mockStore';

import messages from '../../messages/en.json';

const renderWithIntl = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult =>
  render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>,
  );

const renderWithStore = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult =>
  render(
    <Provider store={storeMock}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>,
  );

export { renderWithIntl, renderWithStore };
