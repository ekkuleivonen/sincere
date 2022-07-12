import { useState } from "react";
import styles from "./Post.module.css";

import ActionBar from "./ActionBar/ActionBar";
import LikesCounter from "../LikesCounter/LikesCounter";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

import type { Comment } from "@prisma/client";

export type PostPlayerPost = {
  id: string;
  title: string | null;
  transcript: string | null;
  audio_url: string | null;
  img_url: string | null;
  comments: Comment[];
  likes: number;
};

interface PostPlayerProps {
  post: PostPlayerPost;
}

export default function PostPlayer({ post }: PostPlayerProps) {
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const toggleTranscript = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (!showTranscript) setShowTranscript(true);
    if (showTranscript) setShowTranscript(false);
    return true;
  };
  console.log("rendering post player");
  return (
    <div className={styles.postPlayer}>
      <div className={styles.upperDiv}>
        <LikesCounter direction={"vertical"} likes={post.likes} />
        {post.img_url && <img src={post.img_url} alt="post-thumbnail" />}
        <div className={styles.contentDiv}>
          <h1 className={styles.title}>{post.title}</h1>
          <AudioPlayer audio_url={post.audio_url} />
        </div>
      </div>

      <div className={styles.lowerDiv}>
        <ActionBar
          toggleTranscript={toggleTranscript}
          post_id={post.id}
          comments={post.comments}
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
          <p>{post.transcript}</p>
        </div>
      </div>
    </div>
  );
}
