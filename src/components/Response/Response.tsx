import { useEffect, useState } from 'react';

import type { IResponse } from '@/interfaces/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';

import style from './Response.module.scss';

interface IProps {
  method: TRequestMethod;
  response: IResponse | null;
}

function Response({ response, method }: IProps): JSX.Element {
  const INDENT = 2;
  const [statusString, setStatusString] = useState<{
    value: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    if (method === TRequestMethod.HEAD) {
      const statusOK = 200;
      makeStatus(statusOK, 'OK');
      return;
    }

    if (response !== null) {
      makeStatus(response.status, response.statusText);
    }
  }, [method, response]);

  const makeStatus = (status: number, statusText: string): void => {
    const statusRedirect = 300;
    const statusError = 400;
    let color = 'red';

    if (status < statusRedirect) {
      color = 'green';
    }

    if (status >= statusRedirect && status < statusError) {
      color = 'yellow';
    }

    setStatusString({ value: `${status} ${statusText}`, color });
  };

  return (
    <div className={style.response}>
      <div className={style.response_code}>
        Response code:
        <span style={{ color: statusString?.color ?? 'gray' }}>{statusString?.value ?? ''}</span>
      </div>
      <textarea
        className={style.response_body}
        value={response !== null && Boolean(response.data) ? JSON.stringify(response.data, null, INDENT) : ''}
        rows={20}
        readOnly
      />
    </div>
  );
}

export { Response };
