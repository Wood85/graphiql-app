import { notFound } from 'next/navigation';
import { render } from '@testing-library/react';
import { describe, vi } from 'vitest';

import NotFoundCatchAll from '../app/[locale]/[...not_found]/page';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(typeof actual === 'object' ? actual : {}),
    notFound: vi.fn(),
  };
});

describe('NotFoundCatchAll', () => {
  it('should render correctly', () => {
    render(<NotFoundCatchAll />);

    expect(notFound).toHaveBeenCalled();
  });
});