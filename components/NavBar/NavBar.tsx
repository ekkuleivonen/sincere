import { useState } from "react";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import UploadModal from "../Uploader/Uploader";

export default function NavBar() {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  return (
    <header className={styles.navBar}>
      <div className={styles.container}>
        <img
          src="https://storage.googleapis.com/sincere/assets/hat-filled-white-128.svg"
          alt="sincere hat logo"
          className={styles.navLogo}
        />
        <SearchBar />
        <div className={styles.navMenu}>
          <button
            onClick={() => {
              setShowUploadModal(!showUploadModal);
            }}
          >
            upload
          </button>
          <div className={styles.navToggle}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2089/2089792.png"
              alt="menu icon"
              className={styles.navMenuIcon}
            />
          </div>
        </div>
      </div>
      {showUploadModal && (
        <UploadModal setShowUploadModal={setShowUploadModal} />
      )}
    </header>
  );
}
