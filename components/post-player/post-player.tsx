import styles from "./post-player.module.css";
import useWindowSize from "../../hooks/useWindowSize";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share,
  Bookmark,
  ChevronDown,
} from "react-feather";
import { serialize } from "v8";

//likes
//img
//title
//audio
//comment count

export default function PostPlayer() {
  const windowSize = useWindowSize();
  return (
    <div className={styles.postPlayer}>
      <div className={styles.upperDiv}>
        <div className={styles.likesDiv}>
          <ThumbsUp className={styles.actionIcon} />
          <p>23</p>
          <ThumbsDown className={styles.actionIcon} />
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/92802215?v=4"
          alt="post-thumbnail"
        />
        <div className={styles.contentDiv}>
          <h1 className={styles.title}>
            What's the meaning of anything anymore when...
          </h1>
        </div>
      </div>

      <div className={styles.lowerDiv}>
        <div className={styles.actionBar}>
          <div className={styles.actionBarLeft}>
            <div className={styles.action}>
              <MessageSquare className={styles.actionIcon} />
              {windowSize.width > 1200 && <p>400 Comments</p>}
            </div>
            <div className={styles.action}>
              <Share className={styles.actionIcon} />
              {windowSize.width > 1200 && <p>Share</p>}
            </div>
            <div className={styles.action}>
              <Bookmark />
              {windowSize.width > 1200 && <p>Save</p>}
            </div>
          </div>
          <ChevronDown className={styles.actionIcon} />
        </div>
        <div className={styles.divider} />
        <div className={styles.transcript}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
}
