'use client';

import { useMemo, useState } from 'react';
import cn from 'classnames';
import type { TrackType } from '@/data/tracks';
import {
  getAuthorOptions,
  getGenreOptions,
  type SortOrder,
  type TrackFilters,
} from '@/utils/trackFilters';
import styles from './Filter.module.css';

type FilterName = 'author' | 'sortOrder' | 'genre';

type FilterItem = {
  name: FilterName;
  label: string;
};

type FilterProps = {
  tracks: TrackType[];
  filters: TrackFilters;
  onFiltersChange: (filters: TrackFilters) => void;
};

const filtersList: FilterItem[] = [
  { name: 'author', label: 'исполнителю' },
  { name: 'sortOrder', label: 'году выпуска' },
  { name: 'genre', label: 'жанру' },
];

const sortOptions: { label: string; value: SortOrder }[] = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Сначала новые', value: 'new' },
  { label: 'Сначала старые', value: 'old' },
];

export function Filter({
  tracks,
  filters,
  onFiltersChange,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const authorOptions = useMemo(() => getAuthorOptions(tracks), [tracks]);
  const genreOptions = useMemo(() => getGenreOptions(tracks), [tracks]);

  const handleFilterClick = (filterName: FilterName) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
      return;
    }

    setActiveFilter(filterName);
  };

  const handleAuthorChange = (author: string) => {
    onFiltersChange({
      ...filters,
      author: filters.author === author ? '' : author,
    });
  };

  const handleGenreChange = (genre: string) => {
    onFiltersChange({
      ...filters,
      genre: filters.genre === genre ? '' : genre,
    });
  };

  const handleSortChange = (sortOrder: SortOrder) => {
    onFiltersChange({
      ...filters,
      sortOrder,
    });
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      {filtersList.map((filter) => (
        <div key={filter.name} className={styles.filter__item}>
          <div
            className={cn(styles.filter__button, {
              [styles.active]: activeFilter === filter.name,
            })}
            onClick={() => handleFilterClick(filter.name)}
          >
            {filter.label}
          </div>

          {activeFilter === filter.name && (
            <div className={styles.filter__popup}>
              <ul className={styles.filter__list}>
                {filter.name === 'author' &&
                  authorOptions.map((author) => (
                    <li
                      key={author}
                      className={cn(styles.filter__listItem, {
                        [styles.active]: filters.author === author,
                      })}
                      onClick={() => handleAuthorChange(author)}
                    >
                      {author}
                    </li>
                  ))}

                {filter.name === 'genre' &&
                  genreOptions.map((genre) => (
                    <li
                      key={genre}
                      className={cn(styles.filter__listItem, {
                        [styles.active]: filters.genre === genre,
                      })}
                      onClick={() => handleGenreChange(genre)}
                    >
                      {genre}
                    </li>
                  ))}

                {filter.name === 'sortOrder' &&
                  sortOptions.map((option) => (
                    <li
                      key={option.value}
                      className={cn(styles.filter__listItem, {
                        [styles.active]: filters.sortOrder === option.value,
                      })}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}