import styles from './Search.module.css';

type SearchProps = {
  searchQuery: string;
  onSearchChange: (searchQuery: string) => void;
};

export function Search({ searchQuery, onSearchChange }: SearchProps) {
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}