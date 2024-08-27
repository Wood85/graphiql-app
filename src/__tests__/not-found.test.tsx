import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import NotFound from '../app/not-found';

describe('Not-found page', () => {
  it('should render correctly', () => {
    const nbsp = '\u00A0';

    render(<NotFound />);

    const image = screen.getByRole('img');
    const link = screen.getByRole('link');

    expect(image).toBeDefined();
    expect(link).toBeDefined();
    expect(link.textContent).toEqual(`Main${nbsp}page`);
    expect(link.getAttribute('href')).toEqual('/');
  });
});
