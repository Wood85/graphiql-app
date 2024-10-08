'use client';

import { useEffect } from 'react';

import Editor from '@monaco-editor/react';
import { Flip, toast, ToastContainer } from 'react-toastify';

import ClearIcon from '@/assets/images/icons/ClearIcon';
import CopyIcon from '@/assets/images/icons/CopyIcon';
import PrettifyIcon from '@/assets/images/icons/PrettifyIcon';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectGraphQLVariables, setVariableNotFound } from '@/store/reducers/graphqlSlice';
import prettierPluginGraphql from '@/utils/libs/prettier/graphql.mjs';
import * as prettier from '@/utils/libs/prettier/standalone.mjs';
import { replaceInHistory } from '@/utils/replaceHistory';

import { useTranslations } from 'next-intl';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../UI/Button/Button';
import styles from './QueryEditor.module.scss';

interface IErr {
  cause: {
    message: string;
  };
}
interface IProps {
  setQueryFromLS: React.Dispatch<React.SetStateAction<string>>;
  queryFromLS: string;
}
function QueryEditor({ setQueryFromLS, queryFromLS }: IProps): JSX.Element {
  const t = useTranslations('Graphiql');
  const variables = useAppSelector(selectGraphQLVariables);
  const dispatcher = useAppDispatch();

  function handleEditorChange(value: string | undefined): void {
    if (value !== undefined) {
      setQueryFromLS(value);
    }
  }

  function removeCode(): void {
    setQueryFromLS('');
  }

  function copyCode(): void {
    navigator.clipboard
      .writeText(queryFromLS)
      .then(() => {
        toast.success(t('copyTextSuccess'));
      })
      .catch(() => {
        toast.error(t('copyTextError'));
      });
  }

  function checkVariables(queryString: string, variablesObject: Record<string, unknown>): void {
    const pattern = /:\s*\$([a-zA-Z0-9_]*)/gm;
    if (queryString) {
      const matches = [...queryString.matchAll(pattern)].map((match) => match[1]);
      matches.forEach((varName) => {
        if (!Object.hasOwn(variablesObject, varName)) {
          throw new Error(`Variable "${varName}" is not found in variables`);
        }
      });
    }
  }

  const handleOnBlur = (): void => {
    try {
      checkVariables(queryFromLS, variables);
      dispatcher(setVariableNotFound(false));
      replaceInHistory('body', JSON.stringify({ query: `${queryFromLS}`, variables }));
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
        value={queryFromLS}
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
              const formatted: string = await prettier.format(queryFromLS, {
                parser: 'graphql',
                plugins: [prettierPluginGraphql],
              });
              setQueryFromLS(formatted);
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
