'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Nav.module.css';

export function Nav() {
  const [isOpen, setIsOpen] = useState(true);

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
      <div className={styles.nav__burger}
      onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isOpen && (
      <div className={styles.nav__menu}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="/signin" className={styles.menu__link}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
      )}
    </nav>
  );
}
