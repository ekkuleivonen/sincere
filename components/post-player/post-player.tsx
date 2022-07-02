import { useState } from "react";
import styles from "./post-player.module.css";
import ActionBar from "../action-bar/action-bar";
import LikesCounter from "../likes-counter/likes-counter";
import { ThumbsUp, ThumbsDown } from "react-feather";

//likes
//img
//title
//audio
//comment count

export default function PostPlayer() {
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const toggleTranscript = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (!showTranscript) setShowTranscript(true);
    if (showTranscript) setShowTranscript(false);
    return true;
  };

  return (
    <div className={styles.postPlayer}>
      <div className={styles.upperDiv}>
        <LikesCounter direction={"vertical"} />
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
        <ActionBar
          toggleTranscript={toggleTranscript}
          post_id={"62bd9b1a685bd37a760223dc"}
        />
        <div
          className={
            showTranscript ? `${styles.divider} ${styles.open}` : styles.divider
          }
        />
        <div
          className={
            showTranscript
              ? `${styles.transcript} ${styles.open}`
              : styles.transcript
          }
        >
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
