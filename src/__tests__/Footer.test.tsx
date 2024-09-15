import Footer from '@/app/[locale]/components/Footer/Footer';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';

describe('Footer', () => {
  it('should render names and year correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Wood85')).toBeDefined();
    expect(screen.getByText('doosterhere')).toBeDefined();
    expect(screen.getByText('kagerka')).toBeDefined();
    expect(screen.getByText('2024')).toBeDefined();
  });

  it('should render image and link correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Footer />
      </NextIntlClientProvider>,
    );

    const link = screen.getByTestId('linkToRSS');
    const href = link.getAttribute('href');
    expect(href).toBe('https://rs.school/courses/reactjs');

    const img = screen.getByTestId('RSSLogo');
    const src = img.getAttribute('src');
    expect(src).toBe('/src/assets/images/rss-logo.svg');
  });
});
