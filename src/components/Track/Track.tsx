'use client';

import cn from 'classnames';
import { useSyncExternalStore, type MouseEvent } from 'react';
import Link from 'next/link';
import {
  addTrackToFavorite,
  removeTrackFromFavorite,
} from '@/api/client';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlaying,
} from '@/store/features/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { TrackType } from '@/data/tracks';
import styles from './Track.module.css';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
  onTrackChange: (track: TrackType) => void;
  onError: (message: string) => void;
};

function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth-change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth-change', callback);
  };
}

function getUserIdSnapshot() {
  return localStorage.getItem('userId') || '';
}

function getServerUserIdSnapshot() {
  return '';
}

export function Track({
  track,
  playlist,
  onTrackChange,
  onError,
}: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrentTrack = currentTrack?.id === track.id;

  const userId = useSyncExternalStore(
    subscribeToAuth,
    getUserIdSnapshot,
    getServerUserIdSnapshot,
  );
  const isLiked = userId
    ? track.likedUserIds.includes(Number(userId))
    : false;

  const handleTrackClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const audio = document.getElementById('player-audio') as HTMLAudioElement | null;

    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentTrack(track));

    if (!audio) {
      return;
    }

    audio.src = track.audioUrl;

    audio.play().catch(() => {
      dispatch(setIsPlaying(false));
    });
  };

  const handleLikeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!localStorage.getItem('accessToken')) {
      onError('Чтобы поставить лайк, нужно войти в аккаунт');
      return;
    }

    try {
      if (isLiked) {
        await removeTrackFromFavorite(track.id);
      } else {
        await addTrackToFavorite(track.id);
      }

      const currentUserId = Number(userId);
      const likedUserIds = isLiked
        ? track.likedUserIds.filter((likedUserId) => likedUserId !== currentUserId)
        : [...track.likedUserIds, currentUserId];
      const updatedTrack = {
        ...track,
        likedUserIds,
        likesCount: likedUserIds.length,
      };

      if (isCurrentTrack) {
        dispatch(setCurrentTrack(updatedTrack));
      }

      onTrackChange(updatedTrack);
    } catch (error) {
      onError(
        error instanceof Error
          ? error.message
          : 'Не удалось обновить лайк',
      );
    }
  };

  return (
    <div className={styles.playlist__item} onClick={handleTrackClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrentTrack ? (
              <div
                className={cn(styles.track__playingDot, {
                  [styles.track__playingDot_active]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>

          <div className={styles.track__titleText}>
            <Link className={styles.track__titleLink} href="#">
              {track.title}
              {track.titleSpan && (
                <span className={styles.track__titleSpan}>
                  {track.titleSpan}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="#">
            {track.author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="#">
            {track.album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <button
            className={cn(styles.track__likeButton, {
              [styles.track__likeButton_active]: isLiked,
            })}
            type="button"
            onClick={handleLikeClick}
          >
            <svg className={styles.track__timeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            </svg>
          </button>
          <span className={styles.track__likesCount}>{track.likesCount}</span>
          <span className={styles.track__timeText}>{track.time}</span>
        </div>
      </div>
    </div>
  );
}
