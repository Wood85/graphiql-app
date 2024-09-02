import Client from '@/components/RESTAPIClient/RESTAPIClient';

import style from './page.module.scss';

export default function Restapi(): JSX.Element {
  return (
    <div className={style.client}>
      <Client />
    </div>
  );
}
