'use client';

import { auth, db } from '@/firebase/firebase';
import { Link } from '@/i18n/routing';
import { EMAIL_REGEXP, EMPTY_ARR_LENGTH, PASSWORD_LENGTH } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/UI/Button/Button';
import styles from './page.module.scss';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const dynamic = 'force-dynamic';

function SignUp(): JSX.Element {
  const t = useTranslations('SignUp');

  const [error, setError] = useState('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/[A-Z]+|[А-Я]+/, t('nameUppercase'))
      .required(t('nameRequired')),
    email: yup.string().matches(EMAIL_REGEXP, t('invalidEmail')).required(t('emailRequired')),
    password: yup
      .string()
      .required(t('enterPassword'))
      .min(PASSWORD_LENGTH, t('passwordLength', { passwordLength: PASSWORD_LENGTH }))
      .matches(/[0-9]/, t('passwordNumber'))
      .matches(/[A-Z]/, t('passwordUppercase'))
      .matches(/[a-z]/, t('passwordLowercase'))
      .matches(/[!"#$%&()*^+,.{}<>|@]/, t('passwordSpecialChar')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('passwordMatch'))
      .required(t('passwordRequired')),
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
          setError(t('userAlreadyExist'));
        } else {
          setError(t('userWasNotCreated'));
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
        <h1 className={styles.title}>{t('title')}</h1>
        <div className={styles.input_container}>
          <label htmlFor='name' className={styles.label}>
            {t('name')}
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

        <div className={styles.input_container}>
          <label htmlFor='confirmPassword' className={styles.label}>
            {t('confirmPassword')}
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
          {t('submit')}
        </Button>
        <div className={styles.sign_in_text}>
          {`${t('description')}?`}{' '}
          <Link href='/sign-in' className={styles.sign_in_link}>
            {t('signIn')}
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
