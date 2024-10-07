import { vi } from 'vitest';
import { fireEvent, waitFor, screen } from '@testing-library/dom';

import { renderWithStore } from '@/utils/testUtils';
import GraphiQLClient from '@/app/[locale]/components/GraphiQLClient/GraphiQLClient';

describe('GraphiQLClient', () => {
  it('should render correctly', async () => {
    const { getByText } = renderWithStore(<GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />);

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Headers')).toBeInTheDocument();
    expect(getByText('Set')).toBeInTheDocument();
    expect(getByText('Send')).toBeInTheDocument();
    expect(getByText('No schema available')).toBeInTheDocument();
    expect(getByText('Schema')).toBeInTheDocument();
  });

  it('handleSubmit handles errors correctly', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    fetchSpy.mockRejectedValueOnce(new Error('Test error'));

    const { getByTestId } = renderWithStore(<GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />);

    const formElement = getByTestId('formElement');

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(screen.getByText(/Test error/)).toBeInTheDocument();
    });
  });
});
