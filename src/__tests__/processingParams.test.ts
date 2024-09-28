import processingParams from '@/utils/processingParams';

describe('processingParams', () => {
  it('should return an object with the correct keys', () => {
    const queryParams = '?rest=get&graph=post';
    const result = processingParams(queryParams);

    expect(Object.keys(result)).toEqual(['rest', 'graph']);
  });

  it('should return an object with the correct values', () => {
    const queryParams = '?rest=get&graph=post';
    const result = processingParams(queryParams);

    expect(result).toEqual({ rest: 'get', graph: 'post' });
  });

  it('should handle empty query params', () => {
    const queryParams = '';
    const result = processingParams(queryParams);

    expect(result).toEqual({});
  });

  it('should handle multiple values for a single key', () => {
    const queryParams = '?method=get&method=post';
    const result = processingParams(queryParams);

    expect(result).toEqual({ method: 'post' });
  });
});
