'use client';

import { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Nav.module.css';

function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth-change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth-change', callback);
  };
}

function getAuthSnapshot() {
  return localStorage.getItem('accessToken') || '';
}

function getServerSnapshot() {
  return '';
}

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const accessToken = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getServerSnapshot,
  );

  const isAuthorized = Boolean(accessToken);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    if (pathname !== '/favorites') {
      window.dispatchEvent(new Event('auth-change'));
    }

    router.replace('/');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={113}
          height={17}
          className={styles.logo__image}
          src="/img/logo.png"
          alt="logo"
        />
      </div>

      <div
        className={styles.nav__burger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      {isOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главная
              </Link>
            </li>

            <li className={styles.menu__item}>
              <Link href="/favorites" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>

            <li className={styles.menu__item}>
              {isAuthorized ? (
                <button
                  className={styles.menu__button}
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              ) : (
                <Link href="/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
