import { screen } from '@testing-library/react';
import { type IntrospectionQuery } from 'graphql';

import { renderWithStore } from '@/utils/testUtils';
import { Docs } from '@/app/[locale]/components/GraphiQLClient/Docs/Docs';

describe('Docs component', () => {
  it('renders the component', () => {
    const schema: IntrospectionQuery = {
      __schema: {
        types: [],
        queryType: {
          name: 'Query',
          kind: 'OBJECT',
        },
        mutationType: null,
        subscriptionType: null,
        directives: [],
      },
    };

    renderWithStore(<Docs schema={schema} />);

    expect(screen.getByText('Schema')).toBeDefined();
  });
});
