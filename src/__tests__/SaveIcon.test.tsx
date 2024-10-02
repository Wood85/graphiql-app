import SaveIcon from '@/assets/images/icons/SaveIcon';
import { render, screen } from '@testing-library/react';

describe('SaveIcon', () => {
  it('should render correctly', () => {
    render(<SaveIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('17');
    expect(height).toBe('17');
    expect(fill).toBe('none');
  });
});
