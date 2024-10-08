import configureStore from 'redux-mock-store';

import generalHeaders from '@/utils/headers/generalHeaders';
import requestHeaders from '@/utils/headers/requestHeaders';
import entityHeaders from '@/utils/headers/entityHeaders';

const headersForRequests = [...generalHeaders, ...requestHeaders, ...entityHeaders];

export const initialState = {
  rest: {
    headers: [
      { checked: true, key: 'Accept', value: '*/*' },
      { checked: true, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
      { checked: true, key: 'Connection', value: 'keep-alive' },
    ],
    selectedMethod: 'GET',
    focusCellKey: false,
    focusCellValue: false,
    variables: [],
    focusCellVariable: false,
    focusCellCurrentValue: false,
  },
  headersList: { reqHeaders: headersForRequests },
  loadingState: { isLoading: false },
  graphql: {
    headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
    focusCellKey: false,
    focusCellValue: false,
  },
};
export const mockStore = configureStore();
const storeMock = mockStore(initialState);

export default storeMock;
