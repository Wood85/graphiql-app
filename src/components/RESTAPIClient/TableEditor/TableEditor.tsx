import style from './TableEditor.module.scss';

interface IProps {
  headerKey: string;
  setHeaderKey: React.Dispatch<React.SetStateAction<string>>;
  headerValue: string;
  setHeaderValue: React.Dispatch<React.SetStateAction<string>>;
}

function TableEditor({ headerKey, setHeaderKey, headerValue, setHeaderValue }: IProps): JSX.Element {
  return (
    <div className={style.table}>
      <input
        type='text'
        className={style.input}
        placeholder='Header Key'
        value={headerKey}
        onChange={(e) => {
          setHeaderKey(e.target.value);
        }}
      />
      <input
        type='text'
        className={style.input}
        placeholder='Header Value'
        value={headerValue}
        onChange={(e) => {
          setHeaderValue(e.target.value);
        }}
      />
    </div>
  );
}

export { TableEditor };
