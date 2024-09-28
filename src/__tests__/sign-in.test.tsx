import { screen } from '@testing-library/react';

import { renderWithIntl } from '@/utils/testUtils';
import SignIn from '@/app/[locale]/sign-in/page';

describe('sign-in page', () => {
  it('should render correctly', () => {
    renderWithIntl(<SignIn />);

    expect(screen.getByRole('heading', { level: 1, name: 'Sign In' })).toBeDefined();
    expect(screen.getByTestId('inputEmail')).toBeDefined();
    expect(screen.getByTestId('inputPassword')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign Up' }).getAttribute('href')).toBe('/en/sign-up');
  });
});
