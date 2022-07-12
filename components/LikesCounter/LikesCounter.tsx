import styles from "./LikesCounter.module.css";
import { ThumbsUp, ThumbsDown } from "react-feather";

interface CompProps {
  direction: string;
  likes: number;
}

export default function LikesCounter({ direction, likes }: CompProps) {
  if (direction === "vertical") {
    return (
      <div className={`${styles.likesDiv} ${styles.vertical}`}>
        <div className={styles.action}>
          <ThumbsUp className={styles.actionIcon} size={20} />
        </div>
        <p id="likesCount">{likes}</p>
        <div className={styles.action}>
          <ThumbsDown className={styles.actionIcon} size={20} />
        </div>
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
