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
  likedUserIds: number[];
  likesCount: number;
};
