import { BodyEditor } from '@/app/[locale]/components/RESTAPIClient/BodyEditor/BodyEditor';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithStore } from '../utils/testUtils';

const ONE = 1;
describe('BodyEditor component', () => {
  it('renders correctly', () => {
    const { container } = renderWithStore(<BodyEditor setBody={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('renders headers editor by default', () => {
    const { getByText } = renderWithStore(<BodyEditor setBody={() => {}} />);
    expect(getByText('Headers')).toBeDefined();
  });

  it('switches to body editor', () => {
    const { getByText, getByRole } = renderWithStore(<BodyEditor setBody={() => {}} />);
    const bodyButton = getByRole('button', { name: 'Body' });
    fireEvent.click(bodyButton);
    expect(getByText('Body')).toBeDefined();
  });

  it('switches to variables editor', () => {
    const { getByText, getByRole } = renderWithStore(<BodyEditor setBody={() => {}} />);
    const variablesButton = getByRole('button', { name: 'Variables' });
    fireEvent.click(variablesButton);
    expect(getByText('Variables')).toBeDefined();
  });
});
