import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import { store } from '@/store/store';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

describe('GraphiQLClient', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />
      </Provider>,
    );

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Headers')).toBeInTheDocument();
  });

  it('display text', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <GraphiQLClient graphqlDocsIsOpen setIsDocsAvailable={() => {}} />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Set')).toBeInTheDocument();
      expect(getByText('Send')).toBeInTheDocument();
      expect(getByText('No schema available')).toBeInTheDocument();
      expect(getByText('Schema')).toBeInTheDocument();
    });
  });
});
