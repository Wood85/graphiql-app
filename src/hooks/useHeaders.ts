import { useMemo } from 'react';
import { useAppSelector } from './redux';

export default function useHeaders(): Record<string, string> {
  const headersSelector = useAppSelector((state) => state.rest.headers);

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
