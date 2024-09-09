import Button from '@/components/UI/Button/Button';
import style from './RequestControl.module.scss';

interface IProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  sdlUrl: string;
  setSdlUrl: React.Dispatch<React.SetStateAction<string>>;
}

function RequestControl({ url, setUrl, sdlUrl, setSdlUrl }: IProps): JSX.Element {
  return (
    <div className={style.request_control}>
      <div className={style.url_control}>
        <input
          type='text'
          className={style.endpoint_input}
          placeholder='Endpoint URL'
          value={url}
          onChange={(e) => {
            if (url === sdlUrl.replace(/\?sdl$/, '')) {
              setUrl(e.target.value);
              setSdlUrl(`${e.target.value}?sdl`);
            } else {
              setUrl(e.target.value);
            }
          }}
        />
        <Button type='submit' className={style.button} disabled={url === ''}>
          Send
        </Button>
      </div>
      <div className={style.sdl_control}>
        <input
          type='text'
          className={style.sdl_input}
          placeholder='SDL URL'
          value={sdlUrl}
          onChange={(e) => {
            setSdlUrl(e.target.value);
          }}
        />
        <Button type='button' className={style.button} disabled={sdlUrl === ''}>
          Set
        </Button>
      </div>
    </div>
  );
}

export { RequestControl };
