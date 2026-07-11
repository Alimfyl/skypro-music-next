'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { setIsPlaying } from '@/store/features/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './PlayerBar.module.css';

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    audioRef.current.src = currentTrack.audioUrl;
  }, [currentTrack]);

  const handlePlayClick = () => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      dispatch(setIsPlaying(false));
      return;
    }

    audioRef.current
      .play()
      .then(() => {
        dispatch(setIsPlaying(true));
      })
      .catch(() => {
        dispatch(setIsPlaying(false));
      });
  };

  return (
    <div className={styles.bar}>
      <audio
        id="player-audio"
        ref={audioRef}
        onEnded={() => dispatch(setIsPlaying(false))}
      />

      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnPlay} ${styles.btn}`}
                onClick={handlePlayClick}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlaying
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>

              <div className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div className={`${styles.player__btnRepeat} ${styles.btnIcon}`}>
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div className={`${styles.player__btnShuffle} ${styles.btnIcon}`}>
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>

                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="#">
                    {currentTrack?.title || ''}
                  </Link>
                </div>

                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="#">
                    {currentTrack?.author || ''}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div className={`${styles.trackPlay__like} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>

                <div className={`${styles.trackPlay__dislike} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={`${styles.volume__progress} ${styles.btn}`}>
                <input
                  className={`${styles.volume__progressLine} ${styles.btn}`}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
