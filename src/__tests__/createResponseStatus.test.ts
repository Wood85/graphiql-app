import { STATUS_ERROR, STATUS_OK, STATUS_REDIRECT, STATUS_SERVER_ERROR } from '@/utils/constants';
import { createResponseStatus } from '@/utils/createResponseStatus';

describe('createResponseStatus', () => {
  it('should return green color for status code 200', () => {
    const result = createResponseStatus(STATUS_OK, '');
    expect(result.color).toBe('green');
  });

  it('should return yellow color for status code 300', () => {
    const result = createResponseStatus(STATUS_REDIRECT, '');
    expect(result.color).toBe('yellow');
  });

  it('should return red color for status code 400', () => {
    const result = createResponseStatus(STATUS_ERROR, '');
    expect(result.color).toBe('red');
  });

  it('should return gray color for status code 500', () => {
    const result = createResponseStatus(STATUS_SERVER_ERROR, '');
    expect(result.color).toBe('red');
  });
});
