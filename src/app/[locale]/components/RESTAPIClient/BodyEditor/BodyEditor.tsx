'use client';

import { replaceInHistory } from '@/utils/replaceHistory';
import Editor from '@monaco-editor/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Button from '../../UI/Button/Button';
import HeadersEditor from '../HeadersEditor/HeadersEditor';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import styles from './BodyEditor.module.scss';

interface IProps {
  setBody: React.Dispatch<React.SetStateAction<string>>;
  body: string;
}

type TSelect = 'headers' | 'body' | 'variables';

type TFormat = 'json' | 'text';

export const dynamic = 'force-dynamic';

function BodyEditor({ setBody, body }: IProps): JSX.Element {
  const t = useTranslations('Restapi');

  const [select, setSelect] = useState<TSelect>('headers');
  const [editorValue, setEditorValue] = useState<string>('{}');
  const [format, setFormat] = useState<TFormat>('json');

  function handleEditorChange(value: string | undefined): void {
    if (value !== undefined) {
      setBody(value);
      setEditorValue(value);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.switchers_container}>
        <div className={styles.switcher}>
          <Button
            className={`${styles.button} ${select === 'headers' ? styles.selected : ''}`}
            onClick={() => {
              setSelect('headers');
            }}
          >
            {t('headers')}
          </Button>
          <Button
            className={`${styles.button} ${select === 'body' ? styles.selected : ''}`}
            onClick={() => {
              setSelect('body');
            }}
          >
            {t('body')}
          </Button>
          <Button
            className={`${styles.button} ${select === 'variables' ? styles.selected : ''}`}
            onClick={() => {
              setSelect('variables');
            }}
          >
            {t('variables')}
          </Button>
        </div>
      </div>
      {select === 'headers' && <HeadersEditor />}
      {select === 'body' && (
        <div
          className={styles.editor_container}
          onBlur={() => {
            replaceInHistory('body', editorValue);
          }}
        >
          <div className={styles.format_switcher}>
            <Button
              className={`${styles.format_button} ${format === 'json' ? styles.selected_format : ''}`}
              onClick={() => {
                setFormat('json');
              }}
            >
              JSON
            </Button>
            <Button
              className={`${styles.format_button} ${format === 'text' ? styles.selected_format : ''}`}
              onClick={() => {
                setFormat('text');
              }}
            >
              {t('text')}
            </Button>
          </div>
          <Editor
            height='280px'
            defaultValue='{}'
            language={format}
            theme='vs-light'
            value={body ?? editorValue}
            options={{
              detectIndentation: false,
              fontFamily: '"Cera Pro"',
              fontSize: 16,
              minimap: { enabled: false },
              padding: { top: 42, bottom: 5 },
              renderLineHighlight: 'none',
              scrollBeyondLastLine: false,
              tabSize: 2,
              wordWrap: 'on',
              wrappingIndent: 'deepIndent',
              wrappingStrategy: 'advanced',

              inlineSuggest: {
                enabled: true,
                showToolbar: 'onHover',
                mode: 'subword',
                suppressSuggestions: false,
              },
              autoIndent: 'advanced',
              formatOnPaste: true,
              formatOnType: true,
              autoClosingBrackets: 'always',
            }}
            className={styles.editor}
            onChange={handleEditorChange}
          />
        </div>
      )}
      {select === 'variables' && <VariablesEditor />}
    </div>
  );
}

export { BodyEditor };
