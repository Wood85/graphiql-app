import ClearIcon from '@/assets/images/icons/ClearIcon';
import CopyIcon from '@/assets/images/icons/CopyIcon';
import PrettifyIcon from '@/assets/images/icons/PrettifyIcon';
import SendButtonIcon from '@/assets/images/icons/SendButtonIcon';
import Button from '@/components/UI/Button/Button';
import style from './QueryEditor.module.scss';

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function QueryEditor({ query, setQuery }: IProps): JSX.Element {
  return (
    <div className={style.wrapper}>
      <textarea
        className={style.editor}
        placeholder='Query Editor'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className={style.buttons}>
        <Button className={style.send_button_icon}>
          <SendButtonIcon />
        </Button>
        <Button className={style.prettify_icon}>
          <PrettifyIcon />
        </Button>
        <Button className={style.copy_icon}>
          <CopyIcon />
        </Button>
        <Button className={style.clear_icon}>
          <ClearIcon />
        </Button>
      </div>
    </div>
  );
}

export { QueryEditor };
