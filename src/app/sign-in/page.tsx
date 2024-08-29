'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from '@/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@/components/UI/Button/Button';
import { PASSWORD_LENGTH, EMAIL_REGEXP } from '@/utils/constants';
import styles from './page.module.scss';

interface ISignInForm {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    email: yup.string().matches(EMAIL_REGEXP, 'Invalid email').required('Enter your email'),
    password: yup
      .string()
      .required('Enter your password')
      .min(PASSWORD_LENGTH, `Password must be at least ${PASSWORD_LENGTH} symbol`)
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[!"#$%&()*^+,.{}<>|@]/, 'Must contain at least one special character'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data: ISignInForm): void => {
    signInWithEmailAndPassword(auth, data.email, data.password).catch(() => {
      setError('Invalid credential');
    });
  };

  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user !== null && user !== undefined) router.push('/');
  }, [user, loading, router]);

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.inputContainer}>
          <label htmlFor='email' className={styles.label}>
            E-mail
            <input
              {...register('email', {
                onChange: () => {
                  setError('');
                },
              })}
              id='email'
              type='text'
              className={styles.emailInput}
            />
          </label>
          <div className={styles.inputError}>{errors.email?.message}</div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor='password' className={styles.label}>
            Password
            <input
              {...register('password', {
                onChange: () => {
                  setError('');
                },
              })}
              id='password'
              type='password'
              className={styles.passwordInput}
            />
          </label>
          <div className={styles.inputError}>{errors.password?.message}</div>
        </div>

        <div className={styles.error}>{error}</div>

        <Button className={styles.submit} type='submit'>
          Submit
        </Button>

        <div className={styles.signUpText}>
          {"Don't have an account?"}{' '}
          <Link href='/sign-up' className={styles.signUpLink}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
