import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import Graphiql from '@/app/[locale]/graphiql/page';
import { ClientTop } from '@/app/[locale]/components/ClientTop/ClientTop';
import GraphiQLClient from '@/app/[locale]/components/GraphiQLClient/GraphiQLClient';

vi.mock('@/app/[locale]/components/ClientTop/ClientTop');
vi.mock('@/app/[locale]/components/GraphiQLClient/GraphiQLClient');
(ClientTop as Mock).mockReturnValue(<div>Client title</div>);
(GraphiQLClient as Mock).mockReturnValue(<div>GraphiQlClient</div>);

describe('restapi', () => {
  it('should render correctly', () => {
    renderWithStore(<Graphiql />);

    expect(screen.getByText('Client title')).toBeDefined();
    expect(screen.getByText('GraphiQlClient')).toBeDefined();
  });
});
