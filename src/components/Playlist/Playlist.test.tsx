import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { TrackType } from '@/data/tracks';
import { Playlist } from './Playlist';

vi.mock('@/components/Track/Track', () => ({
  Track: ({ track }: { track: TrackType }) => (
    <div data-testid="track">{track.title}</div>
  ),
}));

const tracks: TrackType[] = [
  {
    id: 1,
    title: 'Alpha',
    author: 'Artist One',
    album: 'First',
    time: '3:10',
    genre: 'Rock',
    releaseDate: 2020,
    audioUrl: '/alpha.mp3',
    likedUserIds: [],
    likesCount: 0,
  },
  {
    id: 2,
    title: 'Beta',
    author: 'Artist Two',
    album: 'Second',
    time: '2:40',
    genre: 'Pop',
    releaseDate: 2023,
    audioUrl: '/beta.mp3',
    likedUserIds: [],
    likesCount: 0,
  },
];

describe('Playlist', () => {
  it('renders playlist headings and all tracks', () => {
    render(
      <Playlist
        tracks={tracks}
        onTrackChange={vi.fn()}
        onError={vi.fn()}
      />,
    );

    expect(screen.getAllByTestId('track')).toHaveLength(2);
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
  });
});
