import { render, screen } from '@testing-library/react';

import BurgerMenuIcon from '@/assets/images/icons/BurgerMenuIcon';

describe('BurgerMenuIcon', () => {
  it('should render correctly', () => {
    render(<BurgerMenuIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('30');
    expect(height).toBe('30');
    expect(fill).toBe('white');
  });
});
