'use client';

import { auth } from '@/firebase/firebase';
import { EMAIL_REGEXP, PASSWORD_LENGTH } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/UI/Button/Button';
import styles from './page.module.scss';

interface ISignInForm {
  email: string;
  password: string;
}

export const dynamic = 'force-dynamic';

function SignIn(): JSX.Element {
  const t = useTranslations('SignIn');

  const [error, setError] = useState('');

  const schema = yup.object().shape({
    email: yup.string().matches(EMAIL_REGEXP, t('invalidEmail')).required(t('emailRequired')),
    password: yup
      .string()
      .required(t('enterPassword'))
      .min(PASSWORD_LENGTH, t('passwordLength', { passwordLength: PASSWORD_LENGTH }))
      .matches(/[0-9]/, t('passwordNumber'))
      .matches(/[A-Z]/, t('passwordUppercase'))
      .matches(/[a-z]/, t('passwordLowercase'))
      .matches(/[!"#$%&()*^+,.{}<>|@]/, t('passwordSpecialChar')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data: ISignInForm): void => {
    signInWithEmailAndPassword(auth, data.email, data.password).catch(() => {
      setError(t('invalidCredential'));
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
        <h1 className={styles.title}>{t('title')}</h1>
        <div className={styles.input_container}>
          <label htmlFor='email' className={styles.label}>
            {t('email')}
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
            {t('password')}
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

        <div className={styles.error}>{error}</div>

        <Button className={styles.submit} disabled={error !== ''} type='submit'>
          {t('submit')}
        </Button>

        <div className={styles.sign_up_text}>
          {`${t('description')}?`}{' '}
          <Link href='/sign-up' className={styles.sign_up_link}>
            {t('signUp')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
