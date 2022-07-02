import styles from "./action-bar.module.css";
import useWindowSize from "../../hooks/useWindowSize";
import { useState } from "react";
import { MessageSquare, Share, Bookmark, ChevronDown } from "react-feather";
import Link from "next/link";

interface CompProps {
  toggleTranscript: (e: React.MouseEvent<Element, MouseEvent>) => boolean;
  post_id: string;
}

export default function ActionBar({ toggleTranscript, post_id }: CompProps) {
  const [showCopied, setShowCopied] = useState<boolean>(false);

  const windowSize = useWindowSize();

  const copyToClipboard = () => {
    let isReady = true;
    function copy() {
      isReady = false;
      navigator.clipboard.writeText(
        `${document.location.host}/posts/${post_id}`
      );
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
      isReady = true;
    }
    if (isReady) return copy();
  };

  return (
    <div className={styles.actionBar}>
      <div className={styles.actionBarLeft}>
        <Link href={`/posts/${post_id}/#comments`}>
          <div className={styles.action}>
            <MessageSquare className={styles.actionIcon} size={20} />
            {windowSize.width && windowSize.width > 1200 && <p>400 Comments</p>}
          </div>
        </Link>
        <div className={styles.action} onClick={copyToClipboard}>
          <Share className={styles.actionIcon} size={20} />
          {windowSize.width && windowSize.width > 1200 && <p>Share</p>}
          {showCopied && (
            <div className={styles.copiedPopup}>
              <h3>Copied to clipboard!</h3>
            </div>
          )}
        </div>
        <div className={styles.action}>
          <Bookmark className={styles.actionIcon} size={20} />
          {windowSize.width && windowSize.width > 1200 && <p>Save</p>}
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
