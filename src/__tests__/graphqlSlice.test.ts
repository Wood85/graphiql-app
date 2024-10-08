import graphqlReducer, { gqlHeaders, gqlFocusCellKey, gqlFocusCellValue } from '@/store/reducers/graphqlSlice';
import type { IState } from '@/store/reducers/graphqlSlice';

const initialState = {
  headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
  focusCellKey: false,
  focusCellValue: false,
};
const headersArr = [
  { checked: true, key: 'Content-type', value: 'application/json' },
  { checked: false, key: 'Accept', value: '*/*' },
];

describe('graphqlSlice', () => {
  it('should set headers with "gqlHeaders" action', () => {
    const action = { type: gqlHeaders.type, payload: headersArr };

    const result = graphqlReducer(initialState as IState, action);

    expect(result.headers[0].key).toBe('Content-type');
    expect(result.headers[1].key).toBe('Accept');
    expect(result.headers[0].value).toBe('application/json');
    expect(result.headers[1].value).toBe('*/*');
    expect(result.headers[0].checked).toBe(true);
    expect(result.headers[1].checked).toBe(false);
  });

  it('should set status cell of key with "gqlFocusCellKey" action', () => {
    const action = { type: gqlFocusCellKey.type, payload: true };

    const result = graphqlReducer(initialState as IState, action);

    expect(result.focusCellKey).toBe(true);
  });

  it('should set status cell of key with "gqlFocusCellValue" action', () => {
    const action = { type: gqlFocusCellValue.type, payload: true };

    const result = graphqlReducer(initialState as IState, action);

    expect(result.focusCellValue).toBe(true);
  });
});
