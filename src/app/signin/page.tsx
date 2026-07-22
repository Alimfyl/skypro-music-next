'use client';

import { saveAuthData } from '@/utils/authStorage';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserTokens, loginUser } from '@/api/client';
import styles from './Signin.module.css';

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorText('');
    setIsLoading(true);

    try {
      const user = await loginUser({
        email,
        password,
      });

      const tokens = await getUserTokens({
        email,
        password,
      });

      saveAuthData({
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
        userName: user.username,
        userId: user._id.toString(),
      });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrorText(
          error.message === '401'
            ? 'Неверная почта или пароль'
            : error.message,
        );
      } else {
        setErrorText('Не удалось войти');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Image
          className={styles.logo}
          src="/img/logo_modal.png"
          alt="Skypro Music"
          width={140}
          height={21}
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Почта"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorText && <p className={styles.error}>{errorText}</p>}

        <button className={styles.primaryButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>

        <Link className={styles.secondaryButton} href="/signup">
          Зарегистрироваться
        </Link>
      </form>
    </main>
  );
}
