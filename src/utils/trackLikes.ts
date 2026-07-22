import type { TrackType } from '@/data/tracks';

export function updateTrackLikeState(
  track: TrackType,
  userId: number,
  shouldLike: boolean,
): TrackType {
  const likedUserIds = shouldLike
    ? Array.from(new Set([...track.likedUserIds, userId]))
    : track.likedUserIds.filter((likedUserId) => likedUserId !== userId);

  return {
    ...track,
    likedUserIds,
    likesCount: likedUserIds.length,
  };
}