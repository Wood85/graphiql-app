import { HeadersEditor } from '@/components/GraphiQLClient/HeadersEditor/HeadersEditor';
import { gqlHeaders } from '@/store/reducers/graphqlSlice';
import { store } from '@/store/store';
import { act, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithStore } from '../utils/testUtils';

const ARR_LENGTH = 2;
const EMPTY_ARR = 0;

const newHeaders = [
  {
    key: 'Content-Type',
    value: 'application/json',
    checked: true,
    userDefined: true,
  },
  {
    key: 'Accept',
    value: '*/*',
    checked: true,
    userDefined: true,
  },
];

describe('HeadersEditor', () => {
  test('should render HeadersEditor component', () => {
    renderWithStore(<HeadersEditor />);

    expect(screen.getByTestId('headers_editor_gql')).toBeDefined();
  });

  test('change the state when dispatching "headers"', () => {
    renderWithStore(<HeadersEditor />);

    act(() => {
      store.dispatch(gqlHeaders(newHeaders));
    });

    expect(store.getState().graphql.headers.length).toBe(ARR_LENGTH);

    act(() => {
      store.dispatch(gqlHeaders([]));
    });

    expect(store.getState().graphql.headers.length).toBe(EMPTY_ARR);
  });
});
