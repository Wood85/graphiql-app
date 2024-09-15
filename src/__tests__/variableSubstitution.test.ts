import substitution from '@/utils/variableSubstitution';

describe('substitution function', () => {
  it('should replace variables with their values', () => {
    const str = 'Welcome back, {{name}}!';
    const variables = [{ key: 'name', value: 'John', checked: true }];
    const result = substitution(str, variables);
    expect(result).toBe('Welcome back, John!');
  });

  it('should not replace variables that are not checked', () => {
    const str = 'Welcome back, {{name}}!';
    const variables = [{ key: 'name', value: 'John', checked: false }];
    const result = substitution(str, variables);
    expect(result).toBe('Welcome back, {{name}}!');
  });

  it('should handle empty string input', () => {
    const str = '';
    const variables: Array<{ key: string; value: string; checked: boolean }> = [];
    const result = substitution(str, variables);
    expect(result).toBe('');
  });
});
