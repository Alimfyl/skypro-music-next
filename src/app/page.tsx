import { getAllTracks } from '@/api/client';
import { mapApiTracksToTracks } from '@/api/mappers';
import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { Playlist } from '@/components/Playlist/Playlist';
import type { TrackType } from '@/data/tracks';
import styles from './page.module.css';

export default async function Home() {
  let tracks: TrackType[] = [];
  let errorMessage = '';

  try {
    const apiTracks = await getAllTracks();
    tracks = mapApiTracksToTracks(apiTracks);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'Не удалось загрузить треки';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>Треки</h2>
            <Filter tracks={tracks} />
            {errorMessage ? (
              <p className={styles.message}>{errorMessage}</p>
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