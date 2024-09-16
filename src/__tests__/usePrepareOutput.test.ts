import usePrepareOutput from '@/hooks/usePrepareOutput';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { type IResponse } from '@/interfaces/Response';
import { renderHook } from '@testing-library/react';

import { expect } from 'vitest';

const res: IResponse | null = null;
const get: TRequestMethod = TRequestMethod.GET;

describe('usePrepareOutput', () => {
  it('should return an object with the correct keys', () => {
    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(Object.keys(result.current)).toEqual(['outputData', 'imageData', 'statusString']);
  });

  it('should return an object with the correct outputData shape', () => {
    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: '',
      type: 'text',
      language: 'text',
    });
  });

  it('should return an object with the correct imageData shape', () => {
    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.imageData).toEqual({
      height: 0,
      url: '',
      width: 0,
    });
  });

  it('should return an object with the correct statusString shape', () => {
    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.statusString).toEqual(null);
  });
});
