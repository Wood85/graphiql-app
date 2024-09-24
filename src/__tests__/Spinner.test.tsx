import { render, screen } from '@testing-library/react';
import Spinner from '@/components/UI/Spinner/Spinner';

describe('Spinner', () => {
  test('renders the Spinner component', () => {
    render(<Spinner />);
    expect(screen.getByTestId('oval-loading')).toBeDefined();
  });
});
