'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface IProps {
  children: React.ReactNode;
}

function ProtectedRouteWrapper({ children }: IProps): React.ReactNode {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const redirect = auth.onAuthStateChanged((currentUser) => {
      if (currentUser === null || currentUser === undefined) {
        router.replace('/');
      }
    });

    return () => {
      redirect();
    };
  }, [user, router]);

  return children;
}

export { ProtectedRouteWrapper };
