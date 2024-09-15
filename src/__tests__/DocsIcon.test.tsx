import DocsIcon from '@/assets/images/icons/DocsIcon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DocsIcon', () => {
  it('should render correctly', () => {
    render(<DocsIcon />);

    const element = screen.getByTestId('svg');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const fill = element.getAttribute('fill');
    expect(width).toBe('45');
    expect(height).toBe('45');
    expect(fill).toBe('none');
  });
});
