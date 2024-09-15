'use client';

import ClearIcon from '@/assets/images/icons/ClearIcon';
import CopyIcon from '@/assets/images/icons/CopyIcon';
import PrettifyIcon from '@/assets/images/icons/PrettifyIcon';
import Button from '@/components/UI/Button/Button';
import prettierPluginGraphql from '@/utils/libs/prettier/graphql.mjs';
import * as prettier from '@/utils/libs/prettier/standalone.mjs';
import Editor from '@monaco-editor/react';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './QueryEditor.module.scss';

interface IErr {
  cause: {
    message: string;
  };
}

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function QueryEditor({ query, setQuery }: IProps): JSX.Element {
  function handleEditorChange(value: string | undefined): void {
    if (value !== undefined) {
      setQuery(value);
    }
  }
  function removeCode(): void {
    setQuery('');
  }

  function copyCode(): void {
    navigator.clipboard
      .writeText(query)
      .then(() => {
        toast.success('Text copied to clipboard');
      })
      .catch(() => {
        toast.error(`Error: text not copied to clipboard`);
      });
  }

  return (
    <div className={styles.wrapper}>
      <Editor
        height='366px'
        defaultValue='#Query Editor'
        language='graphql'
        theme='vs-light'
        value={query}
        options={{
          scrollbar: {
            verticalScrollbarSize: 1,
          },
          detectIndentation: false,
          fontFamily: '"Cera Pro"',
          fontSize: 16,
          minimap: { enabled: false },
          padding: { top: 5, bottom: 5 },
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
      <div className={styles.buttons}>
        <Button
          className={styles.prettify_icon}
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault();
            try {
              const formatted: string = await prettier.format(query, {
                parser: 'graphql',
                plugins: [prettierPluginGraphql],
              });
              setQuery(formatted);
            } catch (error) {
              const err = error as IErr;
              toast.error(`${err.cause.message}}`);
            }
          }}
        >
          <PrettifyIcon />
        </Button>
        <Button
          className={styles.copy_icon}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            copyCode();
          }}
        >
          <CopyIcon />
        </Button>
        <Button
          className={styles.clear_icon}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            removeCode();
          }}
        >
          <ClearIcon />
        </Button>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
      />
    </div>
  );
}

export { QueryEditor };
