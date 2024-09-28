import { ClientTop } from '@/app/[locale]/components/ClientTop/ClientTop';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';

const ROUTES = {
  GRAPHQL: '/en/graphql',
  RESTAPI: '/en/restapi',
  HISTORY: '/en/history',
};

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('ClientTop', () => {
  it('should render correctly', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.GRAPHQL);

    const setGraphqlDocsIsOpen = vi.fn();

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ClientTop
          title='GraphiQL Client'
          setGraphqlDocsIsOpen={setGraphqlDocsIsOpen}
          graphqlDocsIsOpen={false}
          isDocsAvailable
        />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/GraphiQL Client/i)).toBeDefined();

    const historyBtn = screen.getByTestId('historyBtn');
    expect(historyBtn).toBeDefined();

    const link = historyBtn.getAttribute('href');
    expect(link).toBe(ROUTES.HISTORY);
  });

  it('should render correctly', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.GRAPHQL);

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ClientTop title='GraphiQL Client' isDocsAvailable />
      </NextIntlClientProvider>,
    );

    const docsBtn = screen.queryByText(/Docs/i);
    expect(docsBtn).toBeDefined();
  });

  it('should render correctly', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.GRAPHQL);

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ClientTop title='GraphiQL Client' isDocsAvailable={false} />
      </NextIntlClientProvider>,
    );

    const docsBtn = screen.queryByText(/Docs/i);
    expect(docsBtn).toBeNull();
  });
});
