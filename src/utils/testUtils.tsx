import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import storeMock from '../__tests__/mockStore';

import messages_en from '../../messages/en.json';
import messages_ru from '../../messages/ru.json';

const renderWithIntl = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult => {
  const messages = locale === 'en' ? messages_en : messages_ru;

  return render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>,
  );
};

const renderWithStore = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult => {
  const messages = locale === 'en' ? messages_en : messages_ru;

  return render(
    <Provider store={storeMock}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>,
  );
};

export { renderWithIntl, renderWithStore };
