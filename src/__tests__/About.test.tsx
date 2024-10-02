import { screen } from '@testing-library/react';

import { renderWithIntl } from '@/utils/testUtils';
import About from '@/app/[locale]/components/About/About';

describe('About', () => {
  it('should render correctly', () => {
    renderWithIntl(<About />);

    const title = screen.getByText('About us');
    const description = screen.getByText(/this application is a result of our work as a team/i);
    const frontendDeveloperRoles = screen.getAllByText('Frontend developer');
    const expectedLengths = 3;

    expect(title).toBeDefined();
    expect(description).toBeDefined();
    expect(frontendDeveloperRoles).toHaveLength(expectedLengths);
  });
});
