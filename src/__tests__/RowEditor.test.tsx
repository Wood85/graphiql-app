import RowEditor from '@/app/[locale]/components/RowEditor/RowEditor';
import { headers, variables } from '@/store/reducers/restFullSlice';
import { gqlHeaders } from '@/store/reducers/graphqlSlice';
import { store } from '@/store/store';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithStore } from '@/utils/testUtils';

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

const newGqlHeaders = [...newHeaders];

const newVariables = [
  {
    key: 'my_variable_1',
    value: 'my_value_1',
    checked: true,
    userDefined: true,
  },
  {
    key: 'my_variable_2',
    value: 'my_value_2',
    checked: true,
    userDefined: true,
  },
];

describe('RowEditor', () => {
  it('should render row editor', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='headers' />
        </tfoot>
      </table>,
    );

    expect(screen.getByTestId('row_editor')).toBeDefined();
  });

  it('change the state when dispatching "headers" ', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='headers' />
        </tfoot>
      </table>,
    );

    act(() => {
      store.dispatch(headers(newHeaders));
    });

    expect(store.getState().rest.headers.length).toBe(ARR_LENGTH);

    act(() => {
      store.dispatch(headers([]));
    });

    expect(store.getState().rest.headers.length).toBe(EMPTY_ARR);
  });

  it('change the state when dispatching "variables" ', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='variables' />
        </tfoot>
      </table>,
    );

    act(() => {
      store.dispatch(variables(newVariables));
    });

    expect(store.getState().rest.variables.length).toBe(ARR_LENGTH);

    act(() => {
      store.dispatch(variables([]));
    });

    expect(store.getState().rest.variables.length).toBe(EMPTY_ARR);
  });

  it('change the state when dispatching "gqlHeaders" ', () => {
    renderWithStore(
      <table role='grid'>
        <tfoot>
          <RowEditor type='graphqlHeaders' />
        </tfoot>
      </table>,
    );

    act(() => {
      store.dispatch(gqlHeaders(newGqlHeaders));
    });

    expect(store.getState().graphql.headers.length).toBe(ARR_LENGTH);

    act(() => {
      store.dispatch(gqlHeaders([]));
    });

    expect(store.getState().graphql.headers.length).toBe(EMPTY_ARR);
  });
});
