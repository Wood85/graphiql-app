'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/UI/Button/Button';
import { PASSWORD_LENGTH, EMPTY_ARR_LENGTH, EMAIL_REGEXP } from '@/utils/constants';
import styles from './page.module.scss';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp(): JSX.Element {
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/[A-Z]+|[А-Я]+/, 'The first letter must be uppercased')
      .required('Enter your name'),
    email: yup.string().matches(EMAIL_REGEXP, 'Invalid email').required('Enter your email'),
    password: yup
      .string()
      .required('Enter your password')
      .min(PASSWORD_LENGTH, 'Password must be at least 8 symbol')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[!"#$%&()*^+,.{}<>|@]/, 'Must contain at least one special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match')
      .required('Confirm password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data: ISignUpForm): void => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => res.user)
      .then((user) => {
        void addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: data.name,
          authProvider: 'local',
          email: data.email,
        });
      })
      .catch((err) => {
        const res: string[] = err.message.match(/auth\/email-already-in-use/);
        if (res.length > EMPTY_ARR_LENGTH) {
          setError('A user with this email already exists');
        } else {
          setError('Error! User was not created');
        }
      });
  };

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user !== null && user !== undefined) router.push('/');
  }, [user, loading, router]);

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.input_container}>
          <label htmlFor='name' className={styles.label}>
            Name
            <input
              {...register('name', {
                onChange: () => {
                  setError('');
                },
              })}
              id='name'
              type='text'
              className={styles.name_input}
            />
          </label>
          <div className={styles.input_error}>{errors.name?.message}</div>
        </div>
        <div className={styles.input_container}>
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
              className={styles.email_input}
            />
          </label>
          <div className={styles.input_error}>{errors.email?.message}</div>
        </div>

        <div className={styles.input_container}>
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
              className={styles.password_input}
            />
          </label>
          <div className={styles.input_error}>{errors.password?.message}</div>
        </div>

        <div className={styles.input_container}>
          <label htmlFor='confirmPassword' className={styles.label}>
            Confirm password
            <input
              {...register('confirmPassword', {
                onChange: () => {
                  setError('');
                },
              })}
              id='confirmPassword'
              type='password'
              className={styles.confirm_password_input}
            />
          </label>
          <div className={styles.input_error}>{errors.confirmPassword?.message}</div>
        </div>

        <div className={styles.error}>{error}</div>

        <Button className={styles.submit} disabled={error !== ''} type='submit'>
          Submit
        </Button>
        <div className={styles.sign_in_text}>
          Already have an account?{' '}
          <Link href='/sign-in' className={styles.sign_in_link}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
