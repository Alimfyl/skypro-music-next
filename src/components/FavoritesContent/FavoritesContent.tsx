'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { getFavoriteTracks } from '@/api/client';
import { mapApiTracksToTracks } from '@/api/mappers';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import type { TrackType } from '@/data/tracks';

function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth-change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth-change', callback);
  };
}

function getAccessTokenSnapshot() {
  return localStorage.getItem('accessToken') || '';
}

function getServerSnapshot() {
  return '';
}

export function FavoritesContent() {
  const router = useRouter();

  const accessToken = useSyncExternalStore(
    subscribeToAuth,
    getAccessTokenSnapshot,
    getServerSnapshot,
  );

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [message, setMessage] = useState('Загрузка избранных треков...');

  useEffect(() => {
    let isActual = true;

    async function loadFavoriteTracks() {
      if (!accessToken) {
        router.push('/signin');
        return;
      }

      try {
        const apiTracks = await getFavoriteTracks();
        const favoriteTracks = mapApiTracksToTracks(apiTracks);

        if (!isActual) {
          return;
        }

        setTracks(favoriteTracks);
        setMessage(
          favoriteTracks.length === 0 ? 'В избранном пока нет треков' : '',
        );
      } catch (error) {
        if (!isActual) {
          return;
        }

        setMessage(
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить избранные треки',
        );
      }
    }

    void loadFavoriteTracks();

    return () => {
      isActual = false;
    };
  }, [accessToken, router]);

  return (
    <MainLayout
      title="Мои треки"
      tracks={tracks}
      message={message}
      isFavoritesPage
    />
  );
}