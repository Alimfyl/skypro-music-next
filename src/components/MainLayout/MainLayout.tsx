import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { Playlist } from '@/components/Playlist/Playlist';
import type { TrackType } from '@/data/tracks';
import styles from './MainLayout.module.css';

type MainLayoutProps = {
  title: string;
  tracks: TrackType[];
  message?: string;
};

export function MainLayout({ title, tracks, message }: MainLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>{title}</h2>
            <Filter tracks={tracks} />
            {message ? (
              <p className={styles.message}>{message}</p>
            ) : (
              <Playlist tracks={tracks} />
            )}
          </div>
          <Sidebar />
        </main>
        <PlayerBar />
        <footer></footer>
      </div>
    </div>
  );
}