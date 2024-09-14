import Welcome from '@/app/[locale]/components/Welcome/Welcome';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';

describe('About', () => {
  it('should render correctly', async () => {
    const isAuth = true;

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Welcome userName='John' isAuth={isAuth} isLoading={false} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/welcome/i)).toBeDefined();
  });

  it('should render SignIn and SignUp buttons if user is not logged in', async () => {
    const isAuth = false;

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Welcome userName='John' isAuth={isAuth} isLoading={false} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/welcome!/i)).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined();
  });

  it('should render 3 anchors if user is logged in', async () => {
    const expectedAnchorQuantity = 3;
    const isAuth = true;

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Welcome userName='John' isAuth={isAuth} isLoading={false} />
      </NextIntlClientProvider>,
    );

    const anchorElements = screen.getAllByRole('link');

    expect(screen.getByText(/Welcome, John!/i)).toBeDefined();
    expect(anchorElements).toHaveLength(expectedAnchorQuantity);
  });
});
