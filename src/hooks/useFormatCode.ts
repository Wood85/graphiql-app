import { useEffect, useState } from 'react';

import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

interface IFormatCodeReturnType {
  formattedCode: string | null;
  formatCode: () => void;
}

export default function useFormatCode(
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>,
  content: string,
): IFormatCodeReturnType {
  const [formattedCode, setFormattedCode] = useState<string | null>(null);

  const formatCode = async (): Promise<void> => {
    if (editorRef.current !== null) {
      editorRef.current.updateOptions({ readOnly: false });
      await editorRef.current.getAction('editor.action.formatDocument')?.run();
      editorRef.current.updateOptions({ readOnly: true });
      const formattedValue = editorRef.current.getValue();
      setFormattedCode(formattedValue);
    }
  };

  useEffect(() => {
    setFormattedCode(null);
  }, [content]);

  return { formattedCode, formatCode };
}
