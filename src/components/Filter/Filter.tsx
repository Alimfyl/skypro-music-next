'use client';

import { useState } from 'react';
import cn from 'classnames';
import styles from './Filter.module.css';

const filters = ['исполнителю', 'году выпуска', 'жанру'];

export function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filterName: string) => {
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
        <div
          key={filterName}
          className={cn(styles.filter__button, {
            [styles.active]: activeFilter === filterName,
          })}
          onClick={() => handleFilterClick(filterName)}
        >
          {filterName}
        </div>
      ))}
    </div>
  );
}