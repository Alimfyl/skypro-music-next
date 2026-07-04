
import { Track } from '@/components/Track/Track';

export function Playlist() {
    return (
        <div className={'centerblock__content'}>
              <div className={'content__title'}>
                <div className={'playlistTitle__col col01'}>Трек</div>
                <div className={'playlistTitle__col col02'}>Исполнитель</div>
                <div className={'playlistTitle__col col03'}>Альбом</div>
                <div className={'playlistTitle__col col04'}>
                  <svg className={'playlistTitle__svg'}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className={'content__playlist'}>
                <Track title="Guilt" author="Nero" album="Welcome Reality" time="4:44" />
                <Track title="Elektro" author="Dynoro, Outwork, Mr. Gee" album="Elektro" time="2:22" />
                <Track title="I’m Fire" author="Ali Bakgor" album="I’m Fire" time="2:22" />
                <Track title="Non Stop" titleSpan="(Remix)" author="Стоункат, Psychopath" album="Non Stop" time="4:12" />
                <Track title="Run Run" titleSpan="(feat. AR/CO)" author="Jaded, Will Clarke, AR/CO" album="Run Run" time="2:54" />   
              </div>
            </div>
    )
}