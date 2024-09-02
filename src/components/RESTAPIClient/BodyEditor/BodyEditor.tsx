import style from './BodyEditor.module.scss';

interface IProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
}

function BodyEditor({ body, setBody }: IProps): JSX.Element {
  return (
    <textarea
      className={style.editor}
      placeholder='Request Body (JSON)'
      value={body}
      rows={10}
      onChange={(e) => {
        setBody(e.target.value);
      }}
    />
  );
}

export { BodyEditor };
