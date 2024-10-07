import { useRef, useState } from 'react';

import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useFormatCode from '@/hooks/useFormatCode';
import { selectGraphQLVariables, setGraphQLVariables } from '@/store/reducers/graphqlSlice';
import type { TGraphQLVars } from '@/store/reducers/graphqlSlice';
import Button from '@/app/[locale]/components/UI/Button/Button';
import PrettifyIcon from '@/assets/images/icons/PrettifyIcon';

import style from './VariablesEditor.module.scss';

function VariablesEditor(): JSX.Element {
  const INDENT = 2;
  const variablesObject = useAppSelector(selectGraphQLVariables);
  const [variablesString, setVariablesString] = useState(JSON.stringify(variablesObject, null, INDENT));
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const dispatcher = useAppDispatch();
  const { formattedCode, formatCode } = useFormatCode(editorRef, variablesString, true);

  const onEditorMountHandler = async (editor: editor.IStandaloneCodeEditor): Promise<void> => {
    editorRef.current = editor;
  };

  const onHandleEditorChange = (value: string | undefined): void => {
    if (value !== undefined) {
      try {
        const parsedVariablesObject = JSON.parse(value);
        dispatcher(setGraphQLVariables(parsedVariablesObject as TGraphQLVars));
      } catch (e) {
      } finally {
        setVariablesString(value);
      }
    }
  };

  const handlePrettify = (): void => {
    formatCode();

    if (formattedCode !== null) {
      setVariablesString(formattedCode);
    }
  };

  return (
    <div className={style.wrapper}>
      <Editor
        className={style.variables_editor}
        language='json'
        value={variablesString}
        options={{
          detectIndentation: false,
          fontFamily: '"Cera Pro"',
          fontSize: 16,
          formatOnType: true,
          formatOnPaste: true,
          minimap: { enabled: false },
          padding: { top: 5, bottom: 5 },
          renderLineHighlight: 'none',
          scrollbar: {
            verticalScrollbarSize: 0,
          },
          scrollBeyondLastLine: false,
          tabSize: 2,
          wordWrap: 'on',
          wrappingIndent: 'deepIndent',
          wrappingStrategy: 'advanced',
        }}
        onChange={onHandleEditorChange}
        onMount={onEditorMountHandler}
      />
      <Button className={style.button} onClick={handlePrettify}>
        <PrettifyIcon />
      </Button>
    </div>
  );
}

export { VariablesEditor };
