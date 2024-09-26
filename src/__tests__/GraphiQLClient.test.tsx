import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { renderWithStore } from '../utils/testUtils';

describe('GraphiQLClient', () => {
  it('should render correctly', () => {
    const { getByText } = renderWithStore(<GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />);

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Headers')).toBeInTheDocument();
  });

  it('display text', async () => {
    const { getByText } = renderWithStore(<GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />);

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
      expect(getByText('Set')).toBeInTheDocument();
      expect(getByText('Send')).toBeInTheDocument();
      expect(getByText('No schema available')).toBeInTheDocument();
      expect(getByText('Schema')).toBeInTheDocument();
    });
  });
});
