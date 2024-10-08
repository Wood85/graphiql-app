import RestapiIcon from '@/assets/images/icons/RestapiIcon';
import { render, screen } from '@testing-library/react';

describe('RestapiIcon', () => {
  it('should render correctly', () => {
    render(<RestapiIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('45');
    expect(height).toBe('45');
    expect(fill).toBe('none');
  });
});
