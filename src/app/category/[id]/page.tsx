import { getAllTracks, getSelectionById } from '@/api/client';
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
    const [selection, apiTracks] = await Promise.all([
      getSelectionById(Number(id)),
      getAllTracks(),
    ]);

    if (!selection) {
      throw new Error('Подборка не найдена');
    }

    title = selection.name || 'Подборка';

    const selectionTrackIds = new Set(selection.items);
    const selectionTracks = apiTracks.filter((track) =>
      selectionTrackIds.has(track._id),
    );

    tracks = mapApiTracksToTracks(selectionTracks);
  } catch (error) {
    message =
      error instanceof Error ? error.message : 'Не удалось загрузить подборку';
  }

  return <MainLayout title={title} tracks={tracks} message={message} />;
}
