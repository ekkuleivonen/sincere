import React from "react";
import styles from "./nav-bar.module.css";
import Button from "../button/button";
import SearchBar from "../search-bar/search-bar";

export default function NavBar() {
  return (
    <header className={styles.navBar}>
      <div className={styles.container}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/864/864727.png"
          alt="sincere hat logo"
          className={styles.navLogo}
        />
        <SearchBar />
        <div className={styles.navMenu}>
          <Button />
          <div className={styles.navToggle}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2089/2089792.png"
              alt="menu icon"
              className={styles.navMenuIcon}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
