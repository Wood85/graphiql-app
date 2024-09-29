import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import storeMock from '../__tests__/mockStore';

import en from '../../messages/en.json';
import ru from '../../messages/ru.json';

const i18n = {
  en,
  ru,
};

const renderWithIntl = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult => {
  const messages = i18n[locale];

  return render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>,
  );
};

const renderWithStore = (children: React.ReactNode, locale: 'en' | 'ru' = 'en'): RenderResult => {
  const messages = i18n[locale];

  return render(
    <Provider store={storeMock}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>,
  );
};

export { renderWithIntl, renderWithStore };
