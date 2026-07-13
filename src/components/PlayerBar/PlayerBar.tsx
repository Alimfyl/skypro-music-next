'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { tracks, type TrackType } from '@/data/tracks';
import {
  setCurrentTrack,
  setIsPlaying,
  toggleLooping,
  toggleShuffle,
} from '@/store/features/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './PlayerBar.module.css';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${secondsLeft}`;
}

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  const { currentTrack, isPlaying, isLooping, isShuffle } = useAppSelector(
    (state) => state.player,
  );

  const currentTrackIndex = currentTrack
    ? tracks.findIndex((track) => track.id === currentTrack.id)
    : -1;

  const playTrack = (track: TrackType) => {
    if (!audioRef.current) {
      dispatch(setCurrentTrack(track));
      return;
    }

    audioRef.current.src = track.audioUrl;
    audioRef.current.currentTime = 0;

    dispatch(setCurrentTrack(track));

    audioRef.current
      .play()
      .then(() => {
        dispatch(setIsPlaying(true));
      })
      .catch(() => {
        dispatch(setIsPlaying(false));
      });
  };

  const getRandomTrack = () => {
    const availableTracks = currentTrack
      ? tracks.filter((track) => track.id !== currentTrack.id)
      : tracks;

    const randomIndex = Math.floor(Math.random() * availableTracks.length);

    return availableTracks[randomIndex];
  };

  const handleNextClick = () => {
    if (isShuffle) {
      playTrack(getRandomTrack());
      return;
    }

    const nextTrack = tracks[currentTrackIndex + 1];

    if (nextTrack) {
      playTrack(nextTrack);
    }
  };

  const handlePrevClick = () => {
    const prevTrack = tracks[currentTrackIndex - 1];

    if (prevTrack) {
      playTrack(prevTrack);
    }
  };

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

  const handleEnded = () => {
    if (!currentTrack) {
      return;
    }

    if (isLooping) {
      playTrack(currentTrack);
      return;
    }

    if (isShuffle) {
      playTrack(getRandomTrack());
      return;
    }

    const nextTrack = tracks[currentTrackIndex + 1];

    if (nextTrack) {
      playTrack(nextTrack);
      return;
    }

    dispatch(setIsPlaying(false));
    setCurrentTime(0);
  };

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);

    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    audioRef.current.src = currentTrack.audioUrl;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        dispatch(setIsPlaying(false));
      });
    }
  }, [currentTrack, dispatch, isPlaying]);

  return (
    <div className={styles.bar}>
      <audio
        id="player-audio"
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />

      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}>
          <input
            className={styles.bar__playerProgressLine}
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleProgressChange}
            disabled={!currentTrack}
          />
          <span className={styles.bar__time}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={handlePrevClick}
              >
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

              <div
                className={styles.player__btnNext}
                onClick={handleNextClick}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnRepeat} ${styles.btnIcon} ${
                  isLooping ? styles.btnIconActive : ''
                }`}
                onClick={() => dispatch(toggleLooping())}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnShuffle} ${styles.btnIcon} ${
                  isShuffle ? styles.btnIconActive : ''
                }`}
                onClick={() => dispatch(toggleShuffle())}
              >
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
                  min={0}
                  max={100}
                  value={volume}
                  name="range"
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}