import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Button from '../components/UI/Button/Button';

describe('Button', () => {
  it('should render a button', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.textContent).toBe('Button');
  });

  it('should render an anchor', () => {
    render(<Button href='/outer-page'>Anchor</Button>);

    const anchor = screen.getByRole('link', { name: 'Anchor' });

    expect(anchor).toBeDefined();
    expect(anchor.textContent).toBe('Anchor');
    expect(anchor.getAttribute('href')).toBe('/outer-page');
  });

  it('should render a button with inherited and passed classNames', () => {
    render(<Button className='passed_class_name'>Button</Button>);

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDefined();
    expect(button.className).toMatch(/button/i);
    expect(button.className).toMatch(/passed_class_name/i);
  });
});
