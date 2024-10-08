import SelectArrowTopIcon from '@/assets/images/icons/SelectArrowTopIcon';
import { render, screen } from '@testing-library/react';

describe('SelectArrowTopIcon', () => {
  it('should render correctly', () => {
    render(<SelectArrowTopIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('24');
    expect(height).toBe('24');
    expect(fill).toBe('none');
  });
});
