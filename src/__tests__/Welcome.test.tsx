import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Welcome from '@/app/[locale]/components/Welcome/Welcome';

describe('About', () => {
  it('should render correctly', () => {
    const isAuth = true;
    render(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    expect(screen.getByText(/welcome/i)).toBeDefined();
  });

  it('should render SignIn and SignUp buttons if user is not logged in', () => {
    const isAuth = false;
    render(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    expect(screen.getByText(/welcome!/i)).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined();
  });

  it('should render 3 anchors if user is logged in', () => {
    const expectedAnchorQuantity = 3;
    const isAuth = true;

    render(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    const anchorElements = screen.getAllByRole('link');

    expect(screen.getByText(/welcome back, john!/i)).toBeDefined();
    expect(anchorElements).toHaveLength(expectedAnchorQuantity);
  });
});
