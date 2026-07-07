export type TrackType = {
  id: number;
  title: string;
  titleSpan?: string;
  author: string;
  album: string;
  time: string;
  genre: string;
  releaseDate: number;
};

export const tracks: TrackType[] = [
  {
    id: 1,
    title: 'Guilt',
    author: 'Nero',
    album: 'Welcome Reality',
    time: '4:44',
    genre: 'Electronic',
    releaseDate: 2011,
  },
  {
    id: 2,
    title: 'Elektro',
    author: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    time: '2:22',
    genre: 'Dance',
    releaseDate: 2020,
  },
  {
    id: 3,
    title: "I'm Fire",
    author: 'Ali Bakgor',
    album: "I'm Fire",
    time: '2:22',
    genre: 'House',
    releaseDate: 2021,
  },
  {
    id: 4,
    title: 'Non Stop',
    titleSpan: '(Remix)',
    author: 'Стоункат, Psychopath',
    album: 'Non Stop',
    time: '4:12',
    genre: 'Hip-Hop',
    releaseDate: 2019,
  },
  {
    id: 5,
    title: 'Run Run',
    titleSpan: '(feat. AR/CO)',
    author: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    time: '2:54',
    genre: 'Dance',
    releaseDate: 2022,
  },
];
