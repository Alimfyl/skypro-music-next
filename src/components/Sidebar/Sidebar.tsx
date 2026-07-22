'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  clearAuthStorage,
  getServerSnapshot,
  getUserName,
  notifyAuthChange,
  subscribeToAuth,
} from '@/utils/authStorage';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const userName = useSyncExternalStore(
    subscribeToAuth,
    getUserName,
    getServerSnapshot,
  );

  const handleLogout = () => {
    clearAuthStorage();

    if (pathname !== '/favorites') {
      notifyAuthChange();
    }

    router.replace('/');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{userName}</p>
        <button
          className={styles.sidebar__icon}
          type="button"
          onClick={handleLogout}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </button>
      </div>

      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
                loading="eager"
              />
            </Link>
          </div>

          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>

          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
