import { Response, type IProps } from '@/app/[locale]/components/Response/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { renderWithStore } from '@/utils/testUtils';

describe('Response component', () => {
  const props: IProps = {
    method: TRequestMethod.GET,
    response: {
      body: 'Loading...',
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  it('renders correctly', () => {
    const { getByText } = renderWithStore(<Response {...props} />);
    expect(getByText('Loading...')).toBeDefined();
  });
});
