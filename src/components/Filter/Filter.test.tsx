import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { TrackType } from '@/data/tracks';
import { defaultTrackFilters } from '@/utils/trackFilters';
import { Filter } from './Filter';

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

describe('Filter', () => {
  it('selects author filter option', async () => {
    const user = userEvent.setup();
    const handleFiltersChange = vi.fn();

    render(
      <Filter
        tracks={tracks}
        filters={defaultTrackFilters}
        onFiltersChange={handleFiltersChange}
      />,
    );

    await user.click(screen.getByText('исполнителю'));
    await user.click(screen.getByText('Artist One'));

    expect(handleFiltersChange).toHaveBeenCalledWith({
      ...defaultTrackFilters,
      author: 'Artist One',
    });
  });

  it('selects genre filter option', async () => {
    const user = userEvent.setup();
    const handleFiltersChange = vi.fn();

    render(
      <Filter
        tracks={tracks}
        filters={defaultTrackFilters}
        onFiltersChange={handleFiltersChange}
      />,
    );

    await user.click(screen.getByText('жанру'));
    await user.click(screen.getByText('Rock'));

    expect(handleFiltersChange).toHaveBeenCalledWith({
      ...defaultTrackFilters,
      genre: 'Rock',
    });
  });

  it('selects sorting option', async () => {
    const user = userEvent.setup();
    const handleFiltersChange = vi.fn();

    render(
      <Filter
        tracks={tracks}
        filters={defaultTrackFilters}
        onFiltersChange={handleFiltersChange}
      />,
    );

    await user.click(screen.getByText('году выпуска'));
    await user.click(screen.getByText('Сначала новые'));

    expect(handleFiltersChange).toHaveBeenCalledWith({
      ...defaultTrackFilters,
      sortOrder: 'new',
    });
  });
});
