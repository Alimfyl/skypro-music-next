'use client';

import { useState } from 'react';
import cn from 'classnames';
import type { TrackType } from '@/data/tracks';
import styles from './Filter.module.css';

type FilterName = 'author' | 'year' | 'genre';

type FilterItem = {
  name: FilterName;
  label: string;
};

type FilterProps = {
  tracks: TrackType[];
};

const filters: FilterItem[] = [
  { name: 'author', label: 'исполнителю' },
  { name: 'year', label: 'году выпуска' },
  { name: 'genre', label: 'жанру' },
];

function getUniqueValues(values: string[]) {
  return [...new Set(values)].filter(Boolean);
}

export function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const filterOptions: Record<FilterName, string[]> = {
    author: getUniqueValues(tracks.map((track) => track.author)),
    year: getUniqueValues(tracks.map((track) => track.releaseDate.toString())),
    genre: getUniqueValues(tracks.map((track) => track.genre)),
  };

  const handleFilterClick = (filterName: FilterName) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
      return;
    }

    setActiveFilter(filterName);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      {filters.map((filter) => (
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
                {filterOptions[filter.name].map((option) => (
                  <li key={option} className={styles.filter__listItem}>
                    {option}
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