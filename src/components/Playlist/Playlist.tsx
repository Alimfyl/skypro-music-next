
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
                <Track title="Guilt" author="Nero" album="Welcome Reality" time="4:44" />
                <Track title="Elektro" author="Dynoro, Outwork, Mr. Gee" album="Elektro" time="2:22" />
                <Track title="I’m Fire" author="Ali Bakgor" album="I’m Fire" time="2:22" />
                <Track title="Non Stop" titleSpan="(Remix)" author="Стоункат, Psychopath" album="Non Stop" time="4:12" />
                <Track title="Run Run" titleSpan="(feat. AR/CO)" author="Jaded, Will Clarke, AR/CO" album="Run Run" time="2:54" />   
              </div>
            </div>
    )
}