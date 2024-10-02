import Welcome from '@/app/[locale]/components/Welcome/Welcome';
import { screen } from '@testing-library/react';

import { renderWithIntl } from '@/utils/testUtils';

describe('About', () => {
  it('should render correctly', async () => {
    const isAuth = true;

    renderWithIntl(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    expect(screen.getByText(/welcome/i)).toBeDefined();
  });

  it('should render SignIn and SignUp buttons if user is not logged in', async () => {
    const isAuth = false;

    renderWithIntl(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    expect(screen.getByText(/welcome!/i)).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined();
  });

  it('should render 3 anchors if user is logged in', async () => {
    const expectedAnchorQuantity = 3;
    const isAuth = true;

    renderWithIntl(<Welcome userName='John' isAuth={isAuth} isLoading={false} />);

    const anchorElements = screen.getAllByRole('link');

    expect(screen.getByText(/Welcome, John!/i)).toBeDefined();
    expect(anchorElements).toHaveLength(expectedAnchorQuantity);
  });
});
