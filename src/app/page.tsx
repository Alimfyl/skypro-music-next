import { getAllTracks } from '@/api/client';
import { mapApiTracksToTracks } from '@/api/mappers';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import type { TrackType } from '@/data/tracks';

export default async function Home() {
  let tracks: TrackType[] = [];
  let message = '';

  try {
    const apiTracks = await getAllTracks();
    tracks = mapApiTracksToTracks(apiTracks);
  } catch (error) {
    message =
      error instanceof Error ? error.message : 'Не удалось загрузить треки';
  }

  return <MainLayout title="Треки" tracks={tracks} message={message} />;
}