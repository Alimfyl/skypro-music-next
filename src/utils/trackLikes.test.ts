import { describe, expect, it } from 'vitest';
import type { TrackType } from '@/data/tracks';
import { updateTrackLikeState } from './trackLikes';

const track: TrackType = {
  id: 1,
  title: 'Alpha',
  author: 'Artist',
  album: 'Album',
  time: '3:10',
  genre: 'Rock',
  releaseDate: 2020,
  audioUrl: '/alpha.mp3',
  likedUserIds: [1],
  likesCount: 1,
};

describe('updateTrackLikeState', () => {
  it('adds user id to liked users and updates likes count', () => {
    const result = updateTrackLikeState(track, 2, true);

    expect(result.likedUserIds).toEqual([1, 2]);
    expect(result.likesCount).toBe(2);
  });

  it('does not duplicate user id when track is already liked', () => {
    const result = updateTrackLikeState(track, 1, true);

    expect(result.likedUserIds).toEqual([1]);
    expect(result.likesCount).toBe(1);
  });

  it('removes user id from liked users and updates likes count', () => {
    const result = updateTrackLikeState(track, 1, false);

    expect(result.likedUserIds).toEqual([]);
    expect(result.likesCount).toBe(0);
  });

  it('keeps other track fields unchanged', () => {
    const result = updateTrackLikeState(track, 2, true);

    expect(result.title).toBe(track.title);
    expect(result.author).toBe(track.author);
    expect(result.album).toBe(track.album);
  });
});