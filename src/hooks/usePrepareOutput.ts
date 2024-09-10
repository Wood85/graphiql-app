import { useCallback, useEffect, useState } from 'react';

import type { IImageBody, IResponse, ITextBody } from '@/interfaces/Response';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import { createResponseStatus } from '@/utils/createResponseStatus';

type TOutputType = 'text' | 'image';
type TOutputLanguage = 'json' | 'html' | 'css' | 'text' | 'javascript' | 'xml';
interface IOutput {
  content: string;
  type: TOutputType;
  language: TOutputLanguage;
}
interface IImageData {
  url: string;
  width: number;
  height: number;
}
interface IPrepareOutputReturnType {
  outputData: IOutput;
  imageData: IImageData;
  statusString: { value: string; color: string } | null;
}

export default function usePrepareOutput(response: IResponse | null, method: TRequestMethod): IPrepareOutputReturnType {
  const INDENT = 2;
  const [outputData, setOutputData] = useState<IOutput>({ content: '', type: 'text', language: 'text' });
  const [imageData, setImageData] = useState<IImageData>({ url: '', width: 0, height: 0 });
  const [statusString, setStatusString] = useState<{
    value: string;
    color: string;
  } | null>(null);

  const prepareOutput = useCallback(() => {
    const contentIs = (type: string): boolean => response !== null && response.headers['content-type']?.includes(type);
    const responseNotNull = response !== null;
    const responseAndBodyNotNull = response !== null && response.body !== null;

    if (responseNotNull && response.body === null) {
      setOutputData({ content: '', type: 'text', language: 'text' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('json')) {
      const content = JSON.stringify(response.body, null, INDENT);
      setOutputData({ content, type: 'text', language: 'json' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('html')) {
      const content = (response.body as ITextBody).text.trim();
      setOutputData({ content, type: 'text', language: 'html' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('css')) {
      const content = (response.body as ITextBody).text.trim();
      setOutputData({ content, type: 'text', language: 'css' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('javascript')) {
      const content = (response.body as ITextBody).text.trim();
      setOutputData({ content, type: 'text', language: 'javascript' });

      return;
    }

    if (responseAndBodyNotNull && (contentIs('text/xml') || contentIs('application/xml'))) {
      const content = (response.body as ITextBody).text.trim();
      setOutputData({ content, type: 'text', language: 'xml' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('text')) {
      const content = (response.body as ITextBody).text.trim();
      setOutputData({ content, type: 'text', language: 'text' });

      return;
    }

    if (responseAndBodyNotNull && contentIs('image')) {
      const { url, width, height } = response.body as IImageBody;
      setOutputData((prevData) => ({ ...prevData, type: 'image' }));
      setImageData({ url, width, height });

      return;
    }

    setOutputData({ content: '', type: 'text', language: 'text' });
  }, [response]);

  useEffect(() => {
    if (response !== null && method === TRequestMethod.HEAD) {
      setStatusString(createResponseStatus(response.status, response.statusText));
    }

    if (response !== null) {
      setStatusString(createResponseStatus(response.status, response.statusText));
      prepareOutput();
    }
  }, [response, prepareOutput, method]);

  return { outputData, imageData, statusString };
}
