import { screen } from '@testing-library/react';

import { renderWithIntl } from '@/utils/testUtils';
import SignUp from '@/app/[locale]/sign-up/page';

describe('sign-in page', () => {
  it('should render correctly', () => {
    renderWithIntl(<SignUp />);

    expect(screen.getByRole('heading', { level: 1, name: 'Sign Up' })).toBeDefined();
    expect(screen.getByTestId('inputName')).toBeDefined();
    expect(screen.getByTestId('inputEmail')).toBeDefined();
    expect(screen.getByTestId('inputPassword')).toBeDefined();
    expect(screen.getByTestId('inputConfirmPassword')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Sign In' }).getAttribute('href')).toBe('/en/sign-in');
  });
});
