import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import type { IResponse } from '@/interfaces/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { createResponseStatus } from '@/utils/createResponseStatus';

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
  const imageBodyRef = useRef<HTMLDivElement | null>(null);

  const prepareOutput = useCallback(() => {
    if (response !== null && response?.body === null) {
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

  useEffect(() => {
    if (method === TRequestMethod.HEAD) {
      const statusOK = 200;
      setStatusString(createResponseStatus(statusOK, 'OK'));
    }
  }, [method]);

  useEffect(() => {
    if (response !== null) {
      setStatusString(createResponseStatus(response.status, response.statusText));
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
        <div className={style.image_container}>
          <div className={style.image_body} ref={imageBodyRef}>
            <Image
              src={imageUrl}
              alt='Response image'
              className={style.image}
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (imageBodyRef.current !== null) {
                  imageBodyRef.current.style.width = `${naturalWidth}px`;
                  imageBodyRef.current.style.height = `${naturalHeight}px`;
                }
              }}
              fill
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { Response };
