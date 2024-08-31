import React from 'react';
import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Welcome from '@/components/Welcome/Welcome';

describe('About', () => {
  it('should render correctly', () => {
    render(<Welcome />);

    expect(screen.getByText(/welcome/i)).toBeDefined();
  });

  it('should render SignIn and SignUp buttons if user is not logged in', () => {
    render(<Welcome />);

    expect(screen.getByText(/welcome!/i)).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined();
  });

  it('should render 3 anchors if user is logged in', () => {
    const expectedAnchorQuantity = 3;

    render(<Welcome />);

    const togglerButton = screen.getByText('Temporary auth toggler');
    fireEvent.click(togglerButton);

    const anchorElements = screen.getAllByRole('link');

    expect(screen.getByText(/welcome back, user!/i)).toBeDefined();
    expect(anchorElements).toHaveLength(expectedAnchorQuantity);
  });
});
