import { notFound } from 'next/navigation';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import NotFoundCatchAll from '@/app/[locale]/[...not_found]/page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('NotFoundCatchAll', () => {
  it('should render correctly', () => {
    render(<NotFoundCatchAll />);

    expect(notFound).toHaveBeenCalled();
  });
});
