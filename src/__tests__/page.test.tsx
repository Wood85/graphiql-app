import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

test('Page', () => {
  render(<Page />);

  const welcome = screen.getByText(/welcome/i);
  const about = screen.getByText(/about/i);

  expect(welcome).toBeDefined();
  expect(about).toBeDefined();
});
