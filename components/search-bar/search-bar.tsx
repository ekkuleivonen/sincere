import { ChangeEvent, useState } from "react";
import styles from "./search-bar.module.css";
import { Search } from "react-feather";

export default function BearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const searchLetter = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  return (
    <div className={styles.searchBar}>
      <form action="" className={styles.searchForm}>
        <input
          id="search-field"
          type="text"
          placeholder="Search Sincere"
          name="search"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
          onChange={searchLetter}
        />
        <Search color="#757575" className={styles.searchIcon} />
      </form>
    </div>
  );
}
