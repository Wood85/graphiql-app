import { describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import Restapi from '@/app/[locale]/restapi/page';
import { ClientTop } from '@/app/[locale]/components/ClientTop/ClientTop';
import RestClient from '@/app/[locale]/components/RESTAPIClient/RESTAPIClient';

vi.mock('@/app/[locale]/components/ClientTop/ClientTop');
vi.mock('@/app/[locale]/components/RESTAPIClient/RESTAPIClient');
(ClientTop as Mock).mockReturnValue(<div>Client title</div>);
(RestClient as Mock).mockReturnValue(<div>RestClient</div>);

describe('restapi', () => {
  it('should render correctly', () => {
    renderWithStore(<Restapi />);

    expect(screen.getByText('Client title')).toBeDefined();
    expect(screen.getByText('RestClient')).toBeDefined();
  });
});
