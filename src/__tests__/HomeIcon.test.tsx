import HomeIcon from '@/assets/images/icons/HomeIcon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HomeIcon', () => {
  it('should render correctly', () => {
    render(<HomeIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('24');
    expect(height).toBe('24');
    expect(fill).toBe('white');
  });
});
