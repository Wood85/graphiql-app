import About from '@/app/[locale]/components/About/About';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';
describe('About', () => {
  it('should render correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <About />
      </NextIntlClientProvider>,
    );

    const title = screen.getByText('About us');
    const description = screen.getByText(/this application is a result of our work as a team/i);
    const frontendDeveloperRoles = screen.getAllByText('Frontend developer');
    const expectedLengths = 3;

    expect(title).toBeDefined();
    expect(description).toBeDefined();
    expect(frontendDeveloperRoles).toHaveLength(expectedLengths);
  });
});
