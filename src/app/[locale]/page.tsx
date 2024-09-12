'use client';

import About from '@/app/[locale]/components/About/About';
import Welcome from '@/app/[locale]/components/Welcome/Welcome';
import { auth, db } from '@/firebase/firebase';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

function Page(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserName = async (): Promise<void> => {
      try {
        if (user !== null && user !== undefined) {
          setIsLoading(true);
          const q = query(collection(db, 'users'), where('uid', '==', user.uid));
          const doc = await getDocs(q);
          const data: DocumentData = doc.docs[0].data();
          setName(data.name as string);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    void fetchUserName();
  }, [user, loading]);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <Welcome userName={name} isAuth={user !== null && user !== undefined} isLoading={isLoading} />
        <About />
      </div>
    </main>
  );
}
export default Page;
