import { describe, vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import Graphiql from '@/app/[locale]/graphiql/page';
import { ClientTop } from '@/components/ClientTop/ClientTop';
import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';

vi.mock('@/components/ClientTop/ClientTop');
vi.mock('@/components/GraphiQLClient/GraphiQLClient');
(ClientTop as Mock).mockReturnValue(<div>Client title</div>);
(GraphiQLClient as Mock).mockReturnValue(<div>GraphiQlClient</div>);

describe('restapi', () => {
  it('should render correctly', () => {
    renderWithStore(<Graphiql />);

    expect(screen.getByText('Client title')).toBeDefined();
    expect(screen.getByText('GraphiQlClient')).toBeDefined();
  });
});
