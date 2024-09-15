import Footer from '@/app/[locale]/components/Footer/Footer';
import { store } from '@/store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

describe('store', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Footer />
      </Provider>,
    );

    expect(getByText('2024')).toBeDefined();
  });

  it('should have the correct initial state', () => {
    const state = store.getState();
    expect(state).toEqual({
      graphql: {
        focusCellKey: false,
        focusCellValue: false,
        headers: [
          {
            checked: true,
            key: 'Content-type',
            value: 'application/json',
          },
        ],
      },
      headersList: {
        reqHeaders: [
          'Cache-Control',
          'Date',
          'MIME-Version',
          'Pragma',
          'Trailer',
          'Transfer-Encoding',
          'Upgrade',
          'Via',
          'Warning',
          'Accept',
          'Accept-Charset',
          'Accept-Encoding',
          'Accept-Language',
          'Authorization',
          'Content-Disposition',
          'Expect',
          'From',
          'Host',
          'If-Match',
          'If-Modified-Since',
          'If-None-Match',
          'If-Range',
          'If-Unmodified-Since',
          'Max-Forwards',
          'Proxy-Authorization',
          'Range',
          'Referer',
          'TE',
          'User-Agent',
          'Allow',
          'Content-Encoding',
          'Content-Language',
          'Content-Length',
          'Content-Location',
          'Content-MD5',
          'Content-Range',
          'Content-Type',
          'Content-Version',
          'Derived-From',
          'Expires',
          'Last-Modified',
          'Link',
          'Title',
        ],
      },
      loadingState: {
        isLoading: false,
      },
      rest: {
        focusCellCurrentValue: false,
        focusCellKey: false,
        focusCellValue: false,
        focusCellVariable: false,
        headers: [
          {
            checked: true,
            key: 'Accept',
            value: '*/*',
          },
          {
            checked: true,
            key: 'Accept-Encoding',
            value: 'gzip, deflate, br',
          },
          {
            checked: true,
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
        selectedMethod: 'GET',
        variables: [],
      },
    });
  });

  it('should update the state', () => {
    const action = {
      type: 'rest/headers',
      payload: {
        headers: [
          {
            checked: true,
            key: 'Content-type',
            value: 'application/json',
          },
        ],
      },
    };
    store.dispatch(action);

    const state = store.getState();
    expect(state.rest.headers).toEqual([
      {
        checked: true,
        key: 'Accept',
        value: '*/*',
      },
      {
        checked: true,
        key: 'Accept-Encoding',
        value: 'gzip, deflate, br',
      },
      {
        checked: true,
        key: 'Connection',
        value: 'keep-alive',
      },
    ]);
  });

  it('should update the loading state', () => {
    const action = { type: 'loadingState/loadingStarted' };
    store.dispatch(action);

    const state = store.getState();
    expect(state.loadingState.isLoading).toBe(true);
  });

  it('should update the graphql state', () => {
    const action = {
      type: 'graphql/headers',
      payload: {
        headers: [
          {
            checked: true,
            key: 'Content-type',
            value: 'application/json',
          },
        ],
      },
    };
    store.dispatch(action);

    const state = store.getState();
    expect(state.graphql.headers).toEqual([
      {
        checked: true,
        key: 'Content-type',
        value: 'application/json',
      },
    ]);
  });
});
