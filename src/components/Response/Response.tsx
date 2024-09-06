import { useState } from 'react';
import Image from 'next/image';

import Editor from '@monaco-editor/react';
import clsx from 'clsx';

import type { IResponse } from '@/interfaces/Response';
import type { TRequestMethod } from '@/interfaces/RequestMethod';
import usePrepareOutput from '@/hooks/usePrepareOutput';
import Button from '../UI/Button/Button';

import style from './Response.module.scss';

interface IProps {
  method: TRequestMethod;
  response: IResponse | null;
}

enum TTabs {
  BODY = 'BODY',
  HEADERS = 'HEADERS',
}

function Response({ response, method }: IProps): JSX.Element {
  const { output, outputType, outputLanguage, imageUrl, imageSize, statusString } = usePrepareOutput(response, method);
  const [isPretty, setIsPretty] = useState(true);
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.BODY);

  return (
    <div className={style.response}>
      <div className={style.response_header}>
        <div className={style.response_tabs}>
          <Button
            className={clsx(style.button, activeTab === TTabs.BODY ? style.active : '')}
            onClick={() => {
              setActiveTab(TTabs.BODY);
            }}
          >
            Body
          </Button>
          <Button
            className={clsx(style.button, activeTab === TTabs.HEADERS ? style.active : '')}
            onClick={() => {
              setActiveTab(TTabs.HEADERS);
            }}
          >
            Headers
          </Button>
        </div>
        <div className={style.response_status_wrapper}>
          <span className={clsx(style.response_status, style[statusString?.color ?? 'gray'])}>
            {statusString?.value ?? ''}
          </span>
        </div>
      </div>
      <div className={style.output_container}>
        {activeTab === TTabs.BODY && (
          <div className={style.response_body_tab}>
            {outputType === 'text' && (
              <div className={style.response_body_control}>
                <Button
                  className={clsx(style.button, isPretty ? style.active : '')}
                  onClick={() => {
                    setIsPretty(true);
                  }}
                >
                  Pretty
                </Button>
                <Button
                  className={clsx(style.button, isPretty ? '' : style.active)}
                  onClick={() => {
                    setIsPretty(false);
                  }}
                >
                  Raw
                </Button>
              </div>
            )}
            {outputType === 'text' && !isPretty && (
              <textarea className={style.response_body_raw} value={output} readOnly />
            )}
            {outputType === 'text' && isPretty && (
              <Editor
                className={style.response_body_editor}
                language={outputLanguage}
                value={output}
                options={{
                  fontFamily: '"Cera Pro"',
                  fontSize: 16,
                  minimap: { enabled: false },
                  padding: { top: 5, bottom: 5 },
                  readOnly: true,
                  renderLineHighlight: 'none',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  wrappingIndent: 'deepIndent',
                  wrappingStrategy: 'advanced',
                }}
              />
            )}
            {outputType === 'image' && (
              <div className={style.image_container}>
                <Image src={imageUrl} alt='Image' width={imageSize.width} height={imageSize.height} />
              </div>
            )}
          </div>
        )}
        {activeTab === TTabs.HEADERS && <div className={style.response_headers_tab}>HEADERS TABLE</div>}
      </div>
    </div>
  );
}

export { Response };
