import { STATUS_ERROR, STATUS_REDIRECT, STATUS_SERVER_ERROR } from './constants';

export const createResponseStatus = (status: number, statusText: string): { value: string; color: string } => {
  let color = 'red';
  let substituteStatusText = '';

  if (status < STATUS_REDIRECT) {
    color = 'green';
    substituteStatusText = statusText === '' ? 'OK' : '';
  }

  if (status >= STATUS_REDIRECT && status < STATUS_ERROR) {
    color = 'yellow';
    substituteStatusText = statusText === '' ? 'Redirect' : '';
  }

  if (status >= STATUS_ERROR && status < STATUS_SERVER_ERROR) {
    substituteStatusText = statusText === '' ? 'Bad Request' : '';
  }

  if (status >= STATUS_SERVER_ERROR) {
    substituteStatusText = statusText === '' ? 'Internal Server Error' : '';
  }

  return { value: `${status} ${substituteStatusText === '' ? statusText : substituteStatusText}`, color };
};
