export type TrackType = {
  id: number;
  title: string;
  titleSpan?: string;
  author: string;
  album: string;
  time: string;
  genre: string;
  releaseDate: number;
  audioUrl: string;
};

export const tracks: TrackType[] = [
  {
    id: 8,
    title: 'Chase',
    author: 'Alexander Nakarada',
    album: 'Chase',
    time: '3:25',
    genre: 'Классическая музыка',
    releaseDate: 2005,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
  },
  {
    id: 9,
    title: 'Open Sea epic',
    author: 'Frank Schroter',
    album: 'Open Sea epic',
    time: '2:45',
    genre: 'Классическая музыка',
    releaseDate: 2019,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
  },
  {
    id: 10,
    title: 'Sneaky Snitch',
    author: 'Kevin Macleod',
    album: 'Sneaky Snitch',
    time: '5:05',
    genre: 'Классическая музыка',
    releaseDate: 2022,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3',
  },
  {
    id: 11,
    title: 'Secret Garden',
    author: 'Mixkit',
    album: 'Secret Garden',
    time: '5:24',
    genre: 'Классическая музыка',
    releaseDate: 1972,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Mixkit_-_Secret_Garden.mp3',
  },
  {
    id: 12,
    title: 'A journey of successfull winners',
    author: '-',
    album: '-',
    time: '4:15',
    genre: 'Классическая музыка',
    releaseDate: 1985,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_A_Journey_For_Successful_Winners.mp3',
  },
  {
    id: 13,
    title: 'Epic Heroic Conquest',
    author: '-',
    album: 'Epic Heroic Conquest',
    time: '3:20',
    genre: 'Классическая музыка',
    releaseDate: 1962,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_Epic_Heroic_Conquest.mp3',
  },
  {
    id: 14,
    title: 'The March OF The Final Battle',
    author: '-',
    album: 'The March OF The Final Battle',
    time: '3:26',
    genre: 'Классическая музыка',
    releaseDate: 2011,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
  },
  {
    id: 15,
    title: 'True Summer',
    author: '-',
    album: 'True Summer',
    time: '4:13',
    genre: 'Классическая музыка',
    releaseDate: 2012,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_True_Summer.mp3',
  },
  {
    id: 16,
    title: 'Background Sensible',
    author: 'Waltz Piano',
    album: 'Background Sensible',
    time: '2:15',
    genre: 'Классическая музыка',
    releaseDate: 2003,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3',
  },
  {
    id: 17,
    title: 'Cinematic',
    author: 'Winniethemoog',
    album: 'Cinematic',
    time: '3:26',
    genre: 'Классическая музыка',
    releaseDate: 2004,
    audioUrl:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
  },
];
