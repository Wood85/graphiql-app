import { screen } from '@testing-library/react';

import { renderWithIntl } from '@/utils/testUtils';
import Button from '@/app/[locale]/components/UI/Button/Button';

describe('Button', () => {
  it('should render a button', () => {
    renderWithIntl(<Button>Button</Button>);

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.textContent).toBe('Button');
  });

  it('should render an anchor', () => {
    renderWithIntl(<Button href='/outer-page'>Anchor</Button>);

    const anchor = screen.getByRole('link', { name: 'Anchor' });

    expect(anchor).toBeDefined();
    expect(anchor.textContent).toBe('Anchor');
    expect(anchor.getAttribute('href')).toBe('/en/outer-page');
  });

  it('should render a button with inherited and passed classNames', () => {
    renderWithIntl(<Button className='passed_class_name'>Button</Button>);

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.className).toMatch(/button/i);
    expect(button.className).toMatch(/passed_class_name/i);
  });
});
