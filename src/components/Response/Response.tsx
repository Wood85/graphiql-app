import { useRef, useState } from 'react';
import Image from 'next/image';

import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import clsx from 'clsx';

import { selectLoadingState, loadingFinished } from '@/store/reducers/loadingStateSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePrepareOutput from '@/hooks/usePrepareOutput';
import useFormatCode from '@/hooks/useFormatCode';
import type { IResponse } from '@/interfaces/Response';
import type { TRequestMethod } from '@/interfaces/RequestMethod';
import Button from '../UI/Button/Button';
import { Table } from './Table/Table';

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
  const { outputData, imageData, statusString } = usePrepareOutput(response, method);
  const [isPretty, setIsPretty] = useState(true);
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.BODY);
  const dispatcher = useAppDispatch();
  const isLoading = useAppSelector(selectLoadingState);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { formattedCode, formatCode } = useFormatCode(editorRef, outputData.content);

  const onEditorMountHandler = async (editor: editor.IStandaloneCodeEditor): Promise<void> => {
    editorRef.current = editor;
    editor.onDidContentSizeChange(() => {
      formatCode();
    });
  };

  const onImageLoadHandler = (): void => {
    dispatcher(loadingFinished());
  };

  return (
    <div className={style.wrapper}>
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
            {isLoading && <div className={style.sending_status}>Sending request...</div>}
            {outputData.type === 'text' && (
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
            {outputData.type === 'text' && !isPretty && (
              <textarea className={style.response_body_raw} value={outputData.content} readOnly />
            )}
            {outputData.type === 'text' && isPretty && (
              <Editor
                className={style.response_body_editor}
                language={outputData.language}
                value={formattedCode ?? outputData.content}
                options={{
                  detectIndentation: false,
                  fontFamily: '"Cera Pro"',
                  fontSize: 16,
                  formatOnPaste: true,
                  minimap: { enabled: false },
                  padding: { top: 5, bottom: 5 },
                  readOnly: true,
                  renderLineHighlight: 'none',
                  scrollBeyondLastLine: false,
                  tabSize: 2,
                  wordWrap: 'on',
                  wrappingIndent: 'deepIndent',
                  wrappingStrategy: 'advanced',
                }}
                onMount={onEditorMountHandler}
              />
            )}
            {outputData.type === 'image' && (
              <div className={style.image_container}>
                <Image
                  src={imageData.url}
                  alt='Image'
                  width={imageData.width}
                  height={imageData.height}
                  priority
                  onLoad={onImageLoadHandler}
                />
              </div>
            )}
          </div>
        )}
        {activeTab === TTabs.HEADERS && (
          <div className={style.response_headers_tab}>
            <Table headers={response?.headers} />
          </div>
        )}
      </div>
    </div>
  );
}

export { Response };
