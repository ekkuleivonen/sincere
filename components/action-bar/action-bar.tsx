import styles from "./action-bar.module.css";
import useWindowSize from "../../hooks/useWindowSize";
import { MessageSquare, Share, Bookmark, ChevronDown } from "react-feather";

interface CompProps {
  toggleTranscript: (e: Event) => boolean;
}

export default function ActionBar({ toggleTranscript }: CompProps) {
  const windowSize = useWindowSize();
  return (
    <div className={styles.actionBar}>
      <div className={styles.actionBarLeft}>
        <div className={styles.action}>
          <MessageSquare className={styles.actionIcon} size={20} />
          {windowSize.width > 1200 && <p>400 Comments</p>}
        </div>
        <div className={styles.action}>
          <Share className={styles.actionIcon} size={20} />
          {windowSize.width > 1200 && <p>Share</p>}
        </div>
        <div className={styles.action}>
          <Bookmark className={styles.actionIcon} size={20} />
          {windowSize.width > 1200 && <p>Save</p>}
        </div>
      </div>
      <div
        className="transciptToggle"
        onClick={toggleTranscript}
        id="transcript"
      >
        <ChevronDown className={styles.actionIcon} size={20} />
      </div>
    </div>
  );
}
