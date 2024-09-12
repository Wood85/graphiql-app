import style from './VariablesEditor.module.scss';

interface IProps {
  variables: string;
  setVariables: React.Dispatch<React.SetStateAction<string>>;
}

function VariablesEditor({ variables, setVariables }: IProps): JSX.Element {
  return (
    <textarea
      className={style.editor}
      placeholder='Query Editor'
      value={variables}
      onChange={(e) => {
        setVariables(e.target.value);
      }}
    />
  );
}

export { VariablesEditor };
