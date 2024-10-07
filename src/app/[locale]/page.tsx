'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, type DocumentData } from 'firebase/firestore';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';

import About from '@/app/[locale]/components/About/About';
import Welcome from '@/app/[locale]/components/Welcome/Welcome';
import { auth, db } from '@/firebase/firebase';
import 'react-toastify/dist/ReactToastify.css';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

function Page(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ZERO = 0;
  const ONE = 1;
  const [toastId, setToastId] = useState(ZERO);

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
        toast(err as string, {
          type: 'error',
          toastId,
        });
        setToastId(toastId + ONE);
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
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
      />
    </main>
  );
}
export default Page;
