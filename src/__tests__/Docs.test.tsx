import { screen } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import { Docs } from '@/app/[locale]/components/GraphiQLClient/Docs/Docs';
import { testGraphQLSchema } from '@/tests/setup/graphQL';

describe('Docs component', () => {
  it('renders the component if schema is available', () => {
    renderWithStore(<Docs schema={testGraphQLSchema} />);

    expect(screen.getByText('Schema')).toBeDefined();

    expect(screen.getByText(/Test_input_object_1/)).toBeDefined();
    expect(screen.getByText('Test_input_object_title')).toBeDefined();
    expect(screen.getByText('Test_input_object_id')).toBeDefined();

    expect(screen.getByText(/Test_enum_1/)).toBeDefined();
    expect(screen.getByText('Test_enum_value_1')).toBeDefined();
    expect(screen.getByText('Test_enum_value_2')).toBeDefined();

    expect(screen.getByText(/Test_object_1/)).toBeDefined();
    expect(screen.getByText(/Test_object_field_1/)).toBeDefined();
    expect(screen.getByText(/Test_object_field_arg_1/)).toBeDefined();
    expect(screen.getByText(/Test_object_field_arg_2/)).toBeDefined();
    expect(screen.getByText(/Test_object_field_type/)).toBeDefined();
  });

  it('renders the component if schema is unavailable', () => {
    const schema = null;

    renderWithStore(<Docs schema={schema} />);

    expect(screen.getByText('No schema available')).toBeDefined();
  });
});
