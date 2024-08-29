import Welcome from '@/components/Welcome/Welcome';
import About from '@/components/About/About';

import style from './page.module.scss';

export default function Page(): JSX.Element {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <Welcome />
        <About />
      </div>
    </main>
  );
}
