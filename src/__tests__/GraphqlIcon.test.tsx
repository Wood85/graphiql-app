import GraphqlIcon from '@/assets/images/icons/GraphqlIcon';
import { render, screen } from '@testing-library/react';

describe('GraphqlIcon', () => {
  it('should render correctly', () => {
    render(<GraphqlIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('45');
    expect(height).toBe('45');
    expect(fill).toBe('none');
  });
});
