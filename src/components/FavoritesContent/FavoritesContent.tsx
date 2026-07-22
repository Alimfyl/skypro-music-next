'use client';

import {
  getAccessToken,
  subscribeToAuth,
} from '@/utils/authStorage';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { getFavoriteTracks } from '@/api/client';
import { mapApiTracksToTracks } from '@/api/mappers';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import type { TrackType } from '@/data/tracks';



function getServerSnapshot(): string | null {
  return null;
}

export function FavoritesContent() {
  const router = useRouter();

  const accessToken = useSyncExternalStore(
    subscribeToAuth,
    getAccessToken,
    getServerSnapshot,
  );

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [message, setMessage] = useState('Загрузка избранных треков...');

  useEffect(() => {
    let isActual = true;

    async function loadFavoriteTracks() {
      if (accessToken === null) {
        return;
      }

      if (!accessToken) {
        router.replace('/signin');
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

  const layoutKey = `${message}-${tracks.map((track) => track.id).join('-')}`;

  return (
    <MainLayout
      key={layoutKey}
      title="Мои треки"
      tracks={tracks}
      message={message}
      isFavoritesPage
    />
  );
}
