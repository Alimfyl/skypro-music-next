'use client';

import { useCallback, useMemo, useState } from 'react';
import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { Playlist } from '@/components/Playlist/Playlist';
import type { TrackType } from '@/data/tracks';
import {
  defaultTrackFilters,
  getFilteredTracks,
  type TrackFilters,
} from '@/utils/trackFilters';
import styles from './MainLayout.module.css';

function getCurrentUserId() {
  if (typeof window === 'undefined') {
    return 0;
  }

  return Number(localStorage.getItem('userId'));
}

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
  const [filters, setFilters] = useState<TrackFilters>(defaultTrackFilters);
  const [errorText, setErrorText] = useState('');

  const filteredTracks = useMemo(
    () => getFilteredTracks(currentTracks, filters),
    [currentTracks, filters],
  );

  const handleFiltersChange = useCallback((nextFilters: TrackFilters) => {
    setFilters(nextFilters);
  }, []);

  const handleTrackChange = useCallback(
    (updatedTrack: TrackType) => {
      setCurrentTracks((prevTracks) => {
        const userId = getCurrentUserId();
        const isLikedByCurrentUser = updatedTrack.likedUserIds.includes(userId);

        if (isFavoritesPage && !isLikedByCurrentUser) {
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
  const isTracksNotFound = !shownMessage && filteredTracks.length === 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <Search
              searchQuery={filters.searchQuery}
              onSearchChange={(searchQuery) =>
                handleFiltersChange({
                  ...filters,
                  searchQuery,
                })
              }
            />
            <h2 className={styles.centerblock__h2}>{title}</h2>
            <Filter
              tracks={currentTracks}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            {shownMessage && <p className={styles.message}>{shownMessage}</p>}
            {isTracksNotFound && (
              <p className={styles.message}>Нет подходящих треков</p>
            )}
            {!message && !isTracksNotFound && (
              <Playlist
                tracks={filteredTracks}
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