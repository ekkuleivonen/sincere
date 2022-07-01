import { ChangeEvent, useState, useEffect } from "react";
import styles from "./search-bar.module.css";
import { Search } from "react-feather";
import Link from "next/link";

export default function BearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  //closing the search bar when the user clicks outside of it
  useEffect(() => {
    const closeResults = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.id === "search-field" || target.id === "result") return;
      setShowResults(false);
    };
    document.addEventListener("click", closeResults);

    return () => {
      document.removeEventListener("click", closeResults);
    };
  }, [showResults]);
  //finding results for each keypress
  useEffect(() => {
    let throttle = false;
    // store seach results in state
    async function getResults() {
      const response = await fetch("/api/posts/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_value: searchValue,
          search_type: "suggestions",
        }),
      });
      const data = await response.json();
      setResults(data.data);
    }
    if (searchValue && !throttle) getResults();

    return () => {
      setSearchValue("");
      throttle = true;
    };
  }, [searchValue]);
  //handling chnage in input field
  const searchLetter = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
    if (target.value === "") setResults([]);
  };

  return (
    <>
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
            onClick={() => setShowResults(true)}
          />
          <Search color="#757575" className={styles.searchIcon} />
        </form>
        {showResults && <Results results={results} />}
      </div>
    </>
  );
}

function Results({ results }: { results: any[] }) {
  if (results.length < 1)
    return (
      <div className={styles.results}>
        Try searching for people, topics, or keywords
      </div>
    );
  return (
    <div className={styles.results}>
      {results.map((result) => {
        if (result.hasOwnProperty("username")) {
          return (
            <Link href={`./users/${result.id}`}>
              <div className={styles.result} key={result.id} id="result">
                <img
                  src="https://avatars.githubusercontent.com/u/92802215?v=4"
                  alt="avatar"
                />
                <div className={styles.resultText}>
                  <p>{result.username || "loading..."}</p>
                  <p>{result.bio || "loading..."}</p>
                </div>
              </div>
            </Link>
          );
        }
        if (result.hasOwnProperty("title")) {
          return (
            <Link href={`./posts/${result.id}`}>
              <div className={styles.result} key={result.id} id="result">
                <img
                  src="https://i.pinimg.com/564x/f8/b7/f8/f8b7f870c269c9627bea6137dbe3beec.jpg"
                  alt="post thumbnail"
                />
                <p>{result.title}</p>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
