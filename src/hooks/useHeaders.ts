import { useMemo } from 'react';
import { useAppSelector } from './redux';

type TClient = 'rest' | 'graphql';

export default function useHeaders(client: TClient): Record<string, string> {
  const headersSelector = useAppSelector((state) => (client === 'rest' ? state.rest.headers : state.graphql.headers));

  const headers = useMemo(
    (): Record<string, string> =>
      headersSelector.reduce((acc, header) => {
        if (header.checked) {
          return { ...acc, [header.key]: header.value };
        }

        return acc;
      }, {}),
    [headersSelector],
  );

  return headers;
}
