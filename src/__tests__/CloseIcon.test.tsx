import CloseIcon from '@/assets/images/icons/CloseIcon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('CloseIcon', () => {
  it('should render correctly', () => {
    render(<CloseIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('34px');
    expect(height).toBe('34px');
    expect(fill).toBe('white');
  });
});
