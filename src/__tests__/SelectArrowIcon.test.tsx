import SelectArrowIcon from '@/assets/images/icons/SelectArrowIcon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SelectArrowIcon', () => {
  it('should render correctly', () => {
    render(<SelectArrowIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('24');
    expect(height).toBe('24');
    expect(fill).toBe('none');
  });
});
