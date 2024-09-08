import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IImageBody, IResponse, ITextBody } from '@/interfaces/Response';
import { createResponseStatus } from '@/utils/createResponseStatus';

import style from './Response.module.scss';

interface IProps {
  method?: TRequestMethod;
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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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
      Boolean(response.body) && setOutput((response.body as ITextBody).text.trim());
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('image')) {
      setOutputType('image');
      const { url, width, height } = response.body as IImageBody;
      Boolean(response.body) && setImageUrl(url);
      setImageSize({ width, height });
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
      <div className={style.response_status_wrapper}>
        <span className={clsx(style.response_status, style[statusString?.color ?? 'gray'])}>
          {statusString?.value ?? ''}
        </span>
      </div>
      {outputType === 'text' && <textarea className={style.response_body} value={output} readOnly />}
      {outputType === 'image' && (
        <div className={style.image_container}>
          <Image src={imageUrl} alt='Image' width={imageSize.width} height={imageSize.height} />
        </div>
      )}
    </div>
  );
}

export { Response };
