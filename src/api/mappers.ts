import type { TrackType } from '@/data/tracks';
import type { ApiTrack } from './types';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${secondsLeft}`;
}

function getReleaseYear(releaseDate: string) {
  const year = Number(releaseDate.slice(0, 4));

  if (Number.isNaN(year)) {
    return 0;
  }

  return year;
}

export function mapApiTrackToTrack(apiTrack: ApiTrack): TrackType {
  return {
    id: apiTrack._id,
    title: apiTrack.name,
    author: apiTrack.author,
    album: apiTrack.album,
    time: formatDuration(apiTrack.duration_in_seconds),
    genre: apiTrack.genre,
    releaseDate: getReleaseYear(apiTrack.release_date),
    audioUrl: apiTrack.track_file,
  };
}

export function mapApiTracksToTracks(apiTracks: ApiTrack[]): TrackType[] {
  return apiTracks.map(mapApiTrackToTrack);
}