import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [output, setOutput] = useState<string>('');
  const [outputType, setOutputType] = useState<'text' | 'image'>('text');
  const [imageUrl, setImageUrl] = useState<string>('');

  const prepareOutput = useCallback(() => {
    if (response?.body === null) {
      setOutputType('text');
      setOutput('');
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('json')) {
      setOutputType('text');
      setOutput(JSON.stringify(response.body, null, INDENT));
      return;
    }

    if (
      response !== null &&
      (response.headers['content-type']?.includes('text') || response.headers['content-type']?.includes('html'))
    ) {
      setOutputType('text');
      Boolean(response.body) && setOutput((response.body as { text: string }).text.trim());
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('image')) {
      setOutputType('image');
      Boolean(response.body) && setImageUrl((response.body as { url: string }).url);
      return;
    }

    setOutputType('text');
    setOutput('');
  }, [response]);

  const makeStatus = (status: number, statusText: string): void => {
    const STATUS_REDIRECT = 300;
    const STATUS_ERROR = 400;
    const STATUS_SERVER_ERROR = 500;
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

    setStatusString({ value: `${status} ${substituteStatusText === '' ? statusText : substituteStatusText}`, color });
  };

  useEffect(() => {
    if (method === TRequestMethod.HEAD) {
      const statusOK = 200;
      makeStatus(statusOK, 'OK');
    }
  }, [method]);

  useEffect(() => {
    if (response !== null) {
      makeStatus(response.status, response.statusText);
      prepareOutput();
    }
  }, [response, prepareOutput]);

  return (
    <div className={style.response}>
      <div className={style.response_code}>
        Response code:
        <span style={{ color: statusString?.color ?? 'gray' }}>{statusString?.value ?? ''}</span>
      </div>
      {outputType === 'text' && <textarea className={style.response_body} value={output} readOnly />}
      {outputType === 'image' && (
        <div className={style.image_body}>
          <Image src={imageUrl} alt='Response image' width={999999} height={999999} className={style.image} />
        </div>
      )}
    </div>
  );
}

export { Response };
