import { HeadersEditor } from '@/components/GraphiQLClient/HeadersEditor/HeadersEditor';
import { gqlHeaders } from '@/store/reducers/graphqlSlice';
import { store } from '@/store/store';
import { act, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import messages from '../../messages/en.json';
import storeMock from './mockStore';

const ARR_LENGTH = 2;
const EMPTY_ARR = 0;

const locale = 'en';

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
    render(
      <Provider store={storeMock}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <HeadersEditor />
        </NextIntlClientProvider>
        ,
      </Provider>,
    );

    expect(screen.getByTestId('headers_editor_gql')).toBeDefined();
  });

  test('change the state when dispatching "headers"', () => {
    render(
      <Provider store={storeMock}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <HeadersEditor />
        </NextIntlClientProvider>
        ,
      </Provider>,
    );

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
