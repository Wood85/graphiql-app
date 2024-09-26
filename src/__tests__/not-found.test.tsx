import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';
import NotFoundPage from '@/app/[locale]/not-found';
import messages from '../../messages/en.json';

const locale = 'en';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <NotFoundPage />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('img', { name: 'Not found' })).toBeDefined();
    expect(screen.getByRole('link').getAttribute('href')).toBe('/');
  });
});
