'use client';

import cn from 'classnames';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { setCurrentTrack, setIsPlaying } from '@/store/features/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { TrackType } from '@/data/tracks';
import styles from './Track.module.css';

type TrackProps = {
  track: TrackType;
};

export function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleTrackClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const audio = document.getElementById('player-audio') as HTMLAudioElement | null;

    if (!audio) {
      dispatch(setCurrentTrack(track));
      return;
    }

    audio.src = track.audioUrl;
    const playPromise = audio.play();

    dispatch(setCurrentTrack(track));
    playPromise.catch(() => {
      dispatch(setIsPlaying(false));
    });
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
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{track.time}</span>
        </div>
      </div>
    </div>
  );
}
