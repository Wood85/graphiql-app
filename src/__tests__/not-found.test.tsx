import { screen } from '@testing-library/react';

import NotFoundPage from '@/app/[locale]/not-found';
import { renderWithIntl } from '@/utils/testUtils';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    renderWithIntl(<NotFoundPage />);

    expect(screen.getByRole('img', { name: 'Not found' })).toBeDefined();
    expect(screen.getByRole('link').getAttribute('href')).toBe('/');
  });
});
