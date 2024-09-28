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
});
