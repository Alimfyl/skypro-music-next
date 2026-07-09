import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { Playlist } from '@/components/Playlist/Playlist';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>Треки</h2>
            <Filter />
            <Playlist />
          </div>
          <Sidebar />
        </main>
        <PlayerBar />
        <footer></footer>
      </div>
    </div>
  );
}
