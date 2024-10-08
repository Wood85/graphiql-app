import ClearIcon from '@/assets/images/icons/ClearIcon';
import { render, screen } from '@testing-library/react';

describe('ClearIcon', () => {
  it('should render correctly', () => {
    render(<ClearIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('45');
    expect(height).toBe('45');
    expect(fill).toBe('none');
  });
});
