import type { Comment } from "@prisma/client";
import styles from "./comment-section.module.css";

interface Comments {
  comments: Comment[] | null;
}

export default function CommentSection({ comments }: Comments) {
  console.log("comment section here", comments);
  return (
    <div className={styles.test}>
      <h1>COMMENTS SECTION</h1>
    </div>
  );
}
