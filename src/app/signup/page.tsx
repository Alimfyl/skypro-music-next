'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/api/client';
import styles from './Signup.module.css';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorText('');
    setIsLoading(true);

    try {
      await signupUser({
        email,
        username,
        password,
      });

      router.push('/signin');
    } catch (error) {
      if (error instanceof Error) {
        setErrorText(error.message);
      } else {
        setErrorText('Не удалось зарегистрироваться');
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
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorText && <p className={styles.error}>{errorText}</p>}

        <button className={styles.primaryButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>

        <Link className={styles.secondaryButton} href="/signin">
          Войти
        </Link>
      </form>
    </main>
  );
}