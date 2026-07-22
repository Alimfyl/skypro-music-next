import { describe, expect, it } from 'vitest';
import type { TrackType } from '@/data/tracks';
import {
  defaultTrackFilters,
  filterTracksByAuthor,
  filterTracksByGenre,
  getAuthorOptions,
  getFilteredTracks,
  getGenreOptions,
  getUniqueValues,
  searchTracks,
  sortTracksByReleaseDate,
} from './trackFilters';

const tracks: TrackType[] = [
  {
    id: 1,
    title: 'Alpha',
    author: 'Artist One',
    album: 'First',
    time: '3:10',
    genre: 'Rock',
    releaseDate: 2020,
    audioUrl: '/alpha.mp3',
    likedUserIds: [],
    likesCount: 0,
  },
  {
    id: 2,
    title: 'Beta',
    author: 'Artist Two',
    album: 'Second',
    time: '2:40',
    genre: 'Pop',
    releaseDate: 2023,
    audioUrl: '/beta.mp3',
    likedUserIds: [1],
    likesCount: 1,
  },
  {
    id: 3,
    title: 'Alpine',
    author: 'Artist One',
    album: 'Third',
    time: '4:00',
    genre: 'Rock',
    releaseDate: 2018,
    audioUrl: '/alpine.mp3',
    likedUserIds: [2],
    likesCount: 1,
  },
];

describe('track filter helpers', () => {
  it('returns unique non-empty values', () => {
    expect(getUniqueValues(['Rock', '', 'Pop', 'Rock'])).toEqual([
      'Rock',
      'Pop',
    ]);
  });

  it('builds author and genre options from all tracks', () => {
    expect(getAuthorOptions(tracks)).toEqual(['Artist One', 'Artist Two']);
    expect(getGenreOptions(tracks)).toEqual(['Rock', 'Pop']);
  });

  it('searches tracks by first title letters ignoring case and spaces', () => {
    expect(searchTracks(tracks, ' al ').map((track) => track.id)).toEqual([
      1,
      3,
    ]);
    expect(searchTracks(tracks, 'be').map((track) => track.id)).toEqual([2]);
  });

  it('returns original tracks when search query is empty', () => {
    expect(searchTracks(tracks, '')).toBe(tracks);
  });

  it('filters by author and genre', () => {
    expect(filterTracksByAuthor(tracks, 'Artist One').map((track) => track.id))
      .toEqual([1, 3]);
    expect(filterTracksByGenre(tracks, 'Pop').map((track) => track.id))
      .toEqual([2]);
  });

  it('returns original tracks when author or genre is empty', () => {
    expect(filterTracksByAuthor(tracks, '')).toBe(tracks);
    expect(filterTracksByGenre(tracks, '')).toBe(tracks);
  });

  it('sorts tracks by release date', () => {
    expect(sortTracksByReleaseDate(tracks, 'new').map((track) => track.id))
      .toEqual([2, 1, 3]);
    expect(sortTracksByReleaseDate(tracks, 'old').map((track) => track.id))
      .toEqual([3, 1, 2]);
  });

  it('keeps original order for default sorting', () => {
    expect(sortTracksByReleaseDate(tracks, 'default')).toBe(tracks);
  });

  it('combines search, author, genre and sorting', () => {
    const result = getFilteredTracks(tracks, {
      searchQuery: 'al',
      author: 'Artist One',
      genre: 'Rock',
      sortOrder: 'old',
    });

    expect(result.map((track) => track.id)).toEqual([3, 1]);
  });

  it('returns empty list when no tracks match all filters', () => {
    const result = getFilteredTracks(tracks, {
      ...defaultTrackFilters,
      searchQuery: 'unknown',
    });

    expect(result).toEqual([]);
  });
});
