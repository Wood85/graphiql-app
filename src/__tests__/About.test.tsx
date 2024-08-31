import About from '@/app/[lng]/components/About/About';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('About', () => {
  it('should render correctly', () => {
    render(<About />);

    const title = screen.getByText('About us');
    const description = screen.getByText(/this application is a result of our work as a team/i);
    const frontendDeveloperRoles = screen.getAllByText('Frontend developer');
    const expectedLengths = 3;

    expect(title).toBeDefined();
    expect(description).toBeDefined();
    expect(frontendDeveloperRoles).toHaveLength(expectedLengths);
  });
});
