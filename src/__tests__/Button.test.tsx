import Button from '@/app/[locale]/components/UI/Button/Button';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../messages/en.json';

const locale = 'en';

describe('Button', () => {
  it('should render a button', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Button>Button</Button>
      </NextIntlClientProvider>,
    );

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.textContent).toBe('Button');
  });

  it('should render an anchor', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Button href='/outer-page'>Anchor</Button>
      </NextIntlClientProvider>,
    );

    const anchor = screen.getByRole('link', { name: 'Anchor' });

    expect(anchor).toBeDefined();
    expect(anchor.textContent).toBe('Anchor');
    expect(anchor.getAttribute('href')).toBe('/en/outer-page');
  });

  it('should render a button with inherited and passed classNames', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Button className='passed_class_name'>Button</Button>
      </NextIntlClientProvider>,
    );

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.className).toMatch(/button/i);
    expect(button.className).toMatch(/passed_class_name/i);
  });
});
