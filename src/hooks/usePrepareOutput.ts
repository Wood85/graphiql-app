import { useCallback, useEffect, useState } from 'react';

import type { IImageBody, IResponse, ITextBody } from '@/interfaces/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { createResponseStatus } from '@/utils/createResponseStatus';

interface IPrepareOutputType {
  output: string;
  outputType: 'text' | 'image';
  outputLanguage: 'json' | 'html' | 'css' | 'text';
  imageUrl: string;
  imageSize: { width: number; height: number };
  statusString: { value: string; color: string } | null;
}

export default function usePrepareOutput(response: IResponse | null, method: TRequestMethod): IPrepareOutputType {
  const INDENT = 2;
  const [output, setOutput] = useState<string>('');
  const [outputType, setOutputType] = useState<'text' | 'image'>('text');
  const [outputLanguage, setOutputLanguage] = useState<'json' | 'html' | 'css' | 'text'>('text');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [statusString, setStatusString] = useState<{
    value: string;
    color: string;
  } | null>(null);

  const prepareOutput = useCallback(() => {
    if (response !== null && response?.body === null) {
      setOutputType('text');
      setOutputLanguage('text');
      setOutput('');
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('json')) {
      setOutputType('text');
      setOutputLanguage('json');
      setOutput(JSON.stringify(response.body, null, INDENT));
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('html')) {
      setOutputType('text');
      setOutputLanguage('html');
      Boolean(response.body) && setOutput((response.body as ITextBody).text.trim());
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('css')) {
      setOutputType('text');
      setOutputLanguage('css');
      Boolean(response.body) && setOutput((response.body as ITextBody).text.trim());
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('text')) {
      setOutputType('text');
      setOutputLanguage('text');
      Boolean(response.body) && setOutput((response.body as ITextBody).text.trim());
      return;
    }

    if (response !== null && response.headers['content-type']?.includes('image')) {
      setOutputType('image');
      setOutputLanguage('text');
      const { url, width, height } = response.body as IImageBody;
      Boolean(response.body) && setImageUrl(url);
      setImageSize({ width, height });
      return;
    }

    setOutputType('text');
    setOutputLanguage('text');
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

  return { output, outputType, outputLanguage, imageUrl, imageSize, statusString };
}
