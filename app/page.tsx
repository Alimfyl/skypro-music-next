import './page.css';
import Link from 'next/link';
import { Nav } from '@/components/Nav/Nav';
import {Search} from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';

export default function Home() {
  return (
    <div className={'wrapper'}>
      <div className={'container'}>
        <main className={'main'}>
          <Nav />
          <div className={'centerblock'}>
            <Search />
            <h2 className={'centerblock__h2'}>Треки</h2>
            <Filter />
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
                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="#">
                          Guilt <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        Nero
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        Welcome Reality
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>4:44</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="#">
                          Elektro <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        Dynoro, Outwork, Mr. Gee
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        Elektro
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="#">
                          I’m Fire <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        Ali Bakgor
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        I’m Fire
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="#">
                          Non Stop
                          <span className={'track__titleSpan'}>(Remix)</span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        Стоункат, Psychopath
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        Non Stop
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>4:12</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div>
                        <Link className={'track__titleLink'} href="#">
                          Run Run
                          <span className={'track__titleSpan'}>
                            (feat. AR/CO)
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        Jaded, Will Clarke, AR/CO
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        Run Run
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:54</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </main>
        <PlayerBar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
