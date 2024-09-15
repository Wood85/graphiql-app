import SelectArrowBottomIcon from '@/assets/images/icons/SelectArrowBottomIcon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SelectArrowBottomIcon', () => {
  it('should render correctly', () => {
    render(<SelectArrowBottomIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('24');
    expect(height).toBe('24');
    expect(fill).toBe('none');
  });
});
