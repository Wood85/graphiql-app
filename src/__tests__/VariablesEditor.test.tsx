import { VariablesEditor } from '@/components/GraphiQLClient/VariablesEditor/VariablesEditor';
import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

const ONE = 1;

describe('VariablesEditor component', () => {
  it('renders a textarea', () => {
    const { getByPlaceholderText } = render(<VariablesEditor variables='' setVariables={vi.fn()} />);
    expect(getByPlaceholderText('Query Editor')).toBeDefined();
  });

  it('calls setVariables', () => {
    const setVariables = vi.fn();
    const { getByPlaceholderText } = render(<VariablesEditor variables='' setVariables={setVariables} />);
    const textarea = getByPlaceholderText('Query Editor');
    fireEvent.change(textarea, { target: { value: 'query' } });
    expect(setVariables).toHaveBeenCalledTimes(ONE);
    expect(setVariables).toHaveBeenCalledWith('query');
  });

  it('renders the correct value', () => {
    const variables = 'query';
    const { getByDisplayValue } = render(<VariablesEditor variables={variables} setVariables={vi.fn()} />);
    expect(getByDisplayValue(variables)).toBeDefined();
  });
});
