import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import Footer from '@/app/[locale]/components/Footer/Footer';
import { store } from '@/store/store';

describe('store', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Footer />
      </Provider>,
    );

    expect(getByText('2024')).toBeDefined();
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
