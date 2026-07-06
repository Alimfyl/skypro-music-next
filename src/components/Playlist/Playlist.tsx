
import { tracks } from '@/data/tracks';
import { Track } from '@/components/Track/Track';
import styles from './Playlist.module.css';
export function Playlist() {
    return (
        <div className={styles.centerblock__content}>
              <div className={styles.content__title}>
                <div className={styles.playlistTitle__col + ' ' + styles.col01}>Трек</div>
                <div className={styles.playlistTitle__col + ' ' + styles.col02}>Исполнитель</div>
                <div className={styles.playlistTitle__col + ' ' + styles.col03}>Альбом</div>
                <div className={styles.playlistTitle__col + ' ' + styles.col04}>
                  <svg className={styles.playlistTitle__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.content__playlist}>
                {tracks.map((track) => (
                  <Track
                    key={track.id}
                    title={track.title}
                    titleSpan={track.titleSpan}
                    author={track.author}
                    album={track.album}
                    time={track.time}
                  />
                ))}   
              </div>
            </div>
    )
}