import Link from 'next/link';

type TrackProps = {
    title: string;
    titleSpan?: string;
    author: string;
    album: string;
    time: string;
};
export function Track({ title, titleSpan, author, album, time }: TrackProps) {
    return (
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
                          {title}
                          {titleSpan && (<span className={'track__titleSpan'}>{titleSpan}</span>)} 
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="#">
                        {author}
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="#">
                        {album}
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>{time}</span>
                    </div>
                  </div>
                </div>
         
    )
}