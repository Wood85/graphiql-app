import style from './HeadersEditor.module.scss';

interface IProps {
  headerKey: string;
  setHeaderKey: React.Dispatch<React.SetStateAction<string>>;
  headerValue: string;
  setHeaderValue: React.Dispatch<React.SetStateAction<string>>;
}

function HeadersEditor({ headerKey, setHeaderKey, headerValue, setHeaderValue }: IProps): JSX.Element {
  return (
    <div className={style.table}>
      <div className={style.table_heading}>
        <div>Key</div>
        <div>Value</div>
      </div>
      <div className={style.table_row}>
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
      <div className={style.table_row}>
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
      <div className={style.table_row}>
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
    </div>
  );
}

export { HeadersEditor };
