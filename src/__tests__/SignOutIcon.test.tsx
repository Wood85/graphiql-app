import SignOutIcon from '@/assets/images/icons/SignOutIcon';
import { render, screen } from '@testing-library/react';

describe('SignOutIcon', () => {
  it('should render correctly', () => {
    render(<SignOutIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('24');
    expect(height).toBe('24');
    expect(fill).toBe('white');
  });
});
