import type { TrackType } from '@/data/tracks';

export type SortOrder = 'default' | 'new' | 'old';

export type TrackFilters = {
  searchQuery: string;
  author: string;
  genre: string;
  sortOrder: SortOrder;
};

export const defaultTrackFilters: TrackFilters = {
  searchQuery: '',
  author: '',
  genre: '',
  sortOrder: 'default',
};

export function getUniqueValues(values: string[]) {
  return [...new Set(values)].filter(Boolean);
}

export function getAuthorOptions(tracks: TrackType[]) {
  return getUniqueValues(tracks.map((track) => track.author));
}

export function getGenreOptions(tracks: TrackType[]) {
  return getUniqueValues(tracks.map((track) => track.genre));
}

export function searchTracks(tracks: TrackType[], searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return tracks;
  }

  return tracks.filter((track) =>
    track.title.toLowerCase().startsWith(normalizedQuery),
  );
}

export function filterTracksByAuthor(tracks: TrackType[], author: string) {
  if (!author) {
    return tracks;
  }

  return tracks.filter((track) => track.author === author);
}

export function filterTracksByGenre(tracks: TrackType[], genre: string) {
  if (!genre) {
    return tracks;
  }

  return tracks.filter((track) => track.genre === genre);
}

export function sortTracksByReleaseDate(
  tracks: TrackType[],
  sortOrder: SortOrder,
) {
  if (sortOrder === 'default') {
    return tracks;
  }

  return [...tracks].sort((firstTrack, secondTrack) => {
    if (sortOrder === 'new') {
      return secondTrack.releaseDate - firstTrack.releaseDate;
    }

    return firstTrack.releaseDate - secondTrack.releaseDate;
  });
}

export function getFilteredTracks(
  tracks: TrackType[],
  filters: TrackFilters,
) {
  const searchedTracks = searchTracks(tracks, filters.searchQuery);
  const tracksByAuthor = filterTracksByAuthor(searchedTracks, filters.author);
  const tracksByGenre = filterTracksByGenre(tracksByAuthor, filters.genre);

  return sortTracksByReleaseDate(tracksByGenre, filters.sortOrder);
}