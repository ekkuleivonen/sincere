import styles from "./likes-counter.module.css";
import { ThumbsUp, ThumbsDown } from "react-feather";

interface CompProps {
  direction: string;
}

export default function LikesCounter({ direction }: CompProps) {
  if (direction === "vertical") {
    return (
      <div className={`${styles.likesDiv} ${styles.vertical}`}>
        <ThumbsUp className={styles.actionIcon} size={20} />
        <p id="likesCount">23</p>
        <ThumbsDown className={styles.actionIcon} size={20} />
      </div>
    );
  }
  if (direction === "horizontal") {
    return (
      <div className={`${styles.likesDiv} ${styles.horizontal}`}>
        <ThumbsUp className={styles.actionIcon} size={20} />
        <p id="likesCount">23</p>
        <ThumbsDown className={styles.actionIcon} size={20} />
      </div>
    );
  }
  return null;
}
