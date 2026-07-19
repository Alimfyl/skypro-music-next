'use client';

import { useCallback, useState } from 'react';
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
  isFavoritesPage?: boolean;
};

export function MainLayout({
  title,
  tracks,
  message,
  isFavoritesPage = false,
}: MainLayoutProps) {
  const [currentTracks, setCurrentTracks] = useState(tracks);
  const [errorText, setErrorText] = useState('');

  const handleTrackChange = useCallback(
    (updatedTrack: TrackType) => {
      setCurrentTracks((prevTracks) => {
        if (isFavoritesPage && updatedTrack.likesCount === 0) {
          return prevTracks.filter((track) => track.id !== updatedTrack.id);
        }

        return prevTracks.map((track) =>
          track.id === updatedTrack.id ? updatedTrack : track,
        );
      });
    },
    [isFavoritesPage],
  );

  const handleError = useCallback((errorMessage: string) => {
    setErrorText(errorMessage);
  }, []);

  const shownMessage = message || errorText;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>{title}</h2>
            <Filter tracks={currentTracks} />
            {shownMessage && <p className={styles.message}>{shownMessage}</p>}
            {!message && (
              <Playlist
                tracks={currentTracks}
                onTrackChange={handleTrackChange}
                onError={handleError}
              />
            )}
          </div>
          <Sidebar />
        </main>
        <PlayerBar onTrackChange={handleTrackChange} onError={handleError} />
        <footer></footer>
      </div>
    </div>
  );
}