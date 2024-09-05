import { STATUS_ERROR, STATUS_REDIRECT, STATUS_SERVER_ERROR } from './constants';

export const createResponseStatus = (status: number, statusText: string): { value: string; color: string } => {
  let color = 'red';
  let substituteStatusText = '';

  if (status < STATUS_REDIRECT) {
    color = 'green';
  }

  if (status >= STATUS_REDIRECT && status < STATUS_ERROR) {
    color = 'yellow';
  }

  if (statusText === '' && status >= STATUS_SERVER_ERROR) {
    substituteStatusText = 'Internal Server Error';
  }

  return { value: `${status} ${substituteStatusText === '' ? statusText : substituteStatusText}`, color };
};
