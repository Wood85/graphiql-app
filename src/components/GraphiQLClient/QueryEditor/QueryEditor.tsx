'use client';

import { useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';
import { toast, ToastContainer, Flip } from 'react-toastify';

import ClearIcon from '@/assets/images/icons/ClearIcon';
import CopyIcon from '@/assets/images/icons/CopyIcon';
import PrettifyIcon from '@/assets/images/icons/PrettifyIcon';
import { selectGraphQLVariables, selectVariableNotFound, setVariableNotFound } from '@/store/reducers/graphqlSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import prettierPluginGraphql from '@/utils/libs/prettier/graphql.mjs';
import * as prettier from '@/utils/libs/prettier/standalone.mjs';
import { replaceInHistory } from '@/utils/replaceHistory';
import Button from '@/components/UI/Button/Button';

import 'react-toastify/dist/ReactToastify.css';
import styles from './QueryEditor.module.scss';

interface IErr {
  cause: {
    message: string;
  };
}

function QueryEditor(): JSX.Element {
  const [query, setQuery] = useState('');
  const variables = useAppSelector(selectGraphQLVariables);
  const dispatcher = useAppDispatch();

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

  function checkVariables(queryString: string, variablesObject: Record<string, unknown>): void {
    const pattern = /:\s*\$([a-zA-Z0-9_]*)/gm;

    const matches = [...queryString.matchAll(pattern)].map((match) => match[1]);
    matches.forEach((varName) => {
      if (!Object.hasOwn(variablesObject, varName)) {
        throw new Error(`Variable "${varName}" is not found in variables`);
      }
    });
  }

  const handleOnBlur = (): void => {
    try {
      checkVariables(query, variables);
      dispatcher(setVariableNotFound(false));
      replaceInHistory('body', JSON.stringify({ query: `${query}`, variables }));
    } catch (e) {
      dispatcher(setVariableNotFound(true));
      toast.error((e as Error).message);
    }
  };

  useEffect(() => {
    handleOnBlur();
  }, [variables]);

  return (
    <div className={styles.wrapper} onBlur={handleOnBlur}>
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
        autoClose={5000}
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
