'use client';

import { tracks } from '@/data/tracks';
import { useState } from 'react';
import cn from 'classnames';
import styles from './Filter.module.css';

const filters = ['исполнителю', 'году выпуска', 'жанру'] as const;

type FilterName = (typeof filters)[number];

const authors = [...new Set(tracks.map((track) => track.author))];
const years = [...new Set(tracks.map((track) => track.releaseDate.toString()))];
const genres = [...new Set(tracks.map((track) => track.genre))];

const filterOptions: Record<FilterName, string[]> = {
  исполнителю: authors,
  'году выпуска': years,
  жанру: genres,
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

      {filters.map((filterName) => (
        <div key={filterName} className={styles.filter__item}>
          <div
            className={cn(styles.filter__button, {
              [styles.active]: activeFilter === filterName,
            })}
            onClick={() => handleFilterClick(filterName)}
          >
            {filterName}
          </div>

          {activeFilter === filterName && (
            <div className={styles.filter__popup}>
              <ul className={styles.filter__list}>
                {filterOptions[filterName].map((option) => (
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
