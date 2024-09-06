'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Button from '@/components/UI/Button/Button';
import styles from './BodyEditor.module.scss';
import { TableEditor } from '../TableEditor/TableEditor';

interface IProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
}

type TSelect = 'headers' | 'body' | 'variables';

function BodyEditor({ body, setBody }: IProps): JSX.Element {
  const [select, setSelect] = useState<TSelect>('headers');

  function handleEditorChange(value: string | undefined): void {
    console.log('here is the current model value:', value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.switcher}>
        <Button
          className={`${styles.button} ${select === 'headers' ? styles.selected : ''}`}
          onClick={() => {
            setSelect('headers');
          }}
        >
          Headers
        </Button>
        <Button
          className={`${styles.button} ${select === 'body' ? styles.selected : ''}`}
          onClick={() => {
            setSelect('body');
          }}
        >
          Body
        </Button>
        <Button
          className={`${styles.button} ${select === 'variables' ? styles.selected : ''}`}
          onClick={() => {
            setSelect('variables');
          }}
        >
          Variables
        </Button>
      </div>
      {select === 'headers' && <TableEditor />}
      {select === 'body' && (
        <Editor
          height='280px'
          defaultValue='{}'
          defaultLanguage='javascript'
          theme='vs-light'
          options={{
            inlineSuggest: {
              enabled: true,
              showToolbar: 'onHover',
              mode: 'subword',
              suppressSuggestions: false,
            },
            fontSize: 18,
            formatOnType: true,
            autoClosingBrackets: 'always',
            minimap: { enabled: false },
          }}
          className={styles.editor}
          onChange={handleEditorChange}
        />
        // 	<textarea
        //   className={styles.editor}
        //   placeholder='Request Body (JSON)'
        //   value={body}
        //   rows={10}
        //   onChange={(e) => {
        //     setBody(e.target.value);
        //   }}
        // />
      )}
    </div>
  );
}

export { BodyEditor };
