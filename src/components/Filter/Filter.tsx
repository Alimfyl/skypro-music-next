'use client';

import { tracks } from '@/data/tracks';
import { useState } from 'react';
import cn from 'classnames';
import styles from './Filter.module.css';

type FilterName = 'author' | 'year' | 'genre';

type FilterItem = {
  name: FilterName;
  label: string;
};

const filters: FilterItem[] = [
  { name: 'author', label: 'исполнителю' },
  { name: 'year', label: 'году выпуска' },
  { name: 'genre', label: 'жанру' },
];

const authors = [...new Set(tracks.map((track) => track.author))];
const years = [...new Set(tracks.map((track) => track.releaseDate.toString()))];
const genres = [...new Set(tracks.map((track) => track.genre))];

const filterOptions: Record<FilterName, string[]> = {
  author: authors,
  year: years,
  genre: genres,
};

export function Filter() {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

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
