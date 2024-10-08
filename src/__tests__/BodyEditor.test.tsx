import { fireEvent } from '@testing-library/react';

import { renderWithStore } from '@/utils/testUtils';
import { BodyEditor } from '@/app/[locale]/components/RESTAPIClient/BodyEditor/BodyEditor';

describe('BodyEditor component', () => {
  it('renders correctly', () => {
    const { container } = renderWithStore(<BodyEditor body='{}' setBody={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('renders headers editor by default', () => {
    const { getByText } = renderWithStore(<BodyEditor body='{}' setBody={() => {}} />);
    expect(getByText('Headers')).toBeDefined();
  });

  it('switches to body editor', () => {
    const { getByText, getByRole } = renderWithStore(<BodyEditor body='{}' setBody={() => {}} />);
    const bodyButton = getByRole('button', { name: 'Body' });
    fireEvent.click(bodyButton);
    expect(getByText('Body')).toBeDefined();
  });

  it('switches to variables editor', () => {
    const { getByText, getByRole } = renderWithStore(<BodyEditor body='{}' setBody={() => {}} />);
    const variablesButton = getByRole('button', { name: 'Variables' });
    fireEvent.click(variablesButton);
    expect(getByText('Variables')).toBeDefined();
  });
});
