'use client';

import Link from 'next/link';
import { setCurrentTrack } from '@/store/features/playerSlice';
import { useAppDispatch } from '@/store/hooks';
import type { TrackType } from '@/data/tracks';
import styles from './Track.module.css';

type TrackProps = {
  track: TrackType;
};

export function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();

  const handleTrackClick = () => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className={styles.playlist__item} onClick={handleTrackClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
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