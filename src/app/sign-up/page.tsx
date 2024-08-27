'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.scss';

function SignUp(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user !== null && user !== undefined) router.push('/');
  }, [user, loading, router]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Name</div>
          <input
            type='text'
            className={styles.nameInput}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className={styles.inputError} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Email</div>
          <input
            type='text'
            className={styles.emailInput}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className={styles.inputError} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Password</div>
          <input
            type='password'
            className={styles.passwordInput}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={styles.inputError} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Confirm password</div>
          <input
            type='password'
            className={styles.confirmPasswordInput}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <div className={styles.inputError} />
        </div>
        <button
          type='button'
          className={styles.submit}
          onClick={async () => {
            await registerWithEmailAndPassword(name, email, password);
          }}
        >
          Submit
        </button>
        <div className={styles.signInText}>
          Already have an account?{' '}
          <Link href='/sign-in' className={styles.signInLink}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
