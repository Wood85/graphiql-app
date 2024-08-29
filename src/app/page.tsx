'use client';

import React from 'react';
//  { useEffect, useState }
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db, logout } from '@/firebase/firebase';
// import { query, collection, getDocs, where } from 'firebase/firestore';
// import type { DocumentData } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';

import Welcome from '@/components/Welcome/Welcome';
import About from '@/components/About/About';

import style from './page.module.scss';

function Page(): JSX.Element {
  // const [user, loading] = useAuthState(auth);
  // const [name, setName] = useState('');
  // const router = useRouter();

  // useEffect(() => {
  //   if (loading) return;
  //   if (user === null || user === undefined) router.push('/sign-in');
  //   const fetchUserName = async (): Promise<void> => {
  //     try {
  //       const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
  //       const doc = await getDocs(q);
  //       const data: DocumentData = doc.docs[0].data();
  //       setName(data.name as string);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   void fetchUserName();
  // }, [user, loading, router]);

  return (
    <main className={style.main}>
      {/* <div className={styles.container}>
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button type='button' className={styles.container} onClick={logout}>
          Logout
        </button>
      </div> */}
      <div className={style.container}>
        <Welcome />
        <About />
      </div>
    </main>
  );
}
export default Page;
