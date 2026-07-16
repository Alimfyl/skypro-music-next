import { getSelectionById } from '@/api/client';
import { mapApiTracksToTracks } from '@/api/mappers';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import type { TrackType } from '@/data/tracks';

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  let title = 'Подборка';
  let tracks: TrackType[] = [];
  let message = '';

  try {
    const selection = await getSelectionById(Number(id));

    title = selection.name;
    tracks = mapApiTracksToTracks(selection.items);
  } catch (error) {
    message =
      error instanceof Error ? error.message : 'Не удалось загрузить подборку';
  }

  return <MainLayout title={title} tracks={tracks} message={message} />;
}