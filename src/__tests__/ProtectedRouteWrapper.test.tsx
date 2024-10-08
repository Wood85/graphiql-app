import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';

import { ProtectedRouteWrapper } from '@/app/[locale]/components/ProtectedRouteWrapper';

describe('ProtectedRouteWrapper', () => {
  it('should render protected child component correctly', () => {
    render(
      <ProtectedRouteWrapper>
        <div>Protected child component</div>
      </ProtectedRouteWrapper>,
    );

    expect(screen.getByText('Protected child component')).toBeDefined();
  });
});
