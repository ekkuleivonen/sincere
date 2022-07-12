import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CommentSection from "../../components/CommentSection/CommentSection";
import { useRouter } from "next/router";
import type { Post, Comment } from "@prisma/client";

const PostDetailView: NextPage = () => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [commentData, setCommentData] = useState<Comment[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    // fetch the post data including all comments from the db
    const setCurrentPostWithComments = async () => {
      const slug = router.query.post_id as string;
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      setPostData(data.post_data);
      setCommentData(data.comment_data);
    };

    if (router.isReady) setCurrentPostWithComments();
  }, [router]);

  return (
    <div>
      <Head>
        <title>Sincere</title>
        <meta
          name="description"
          content="The next gen social media platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Current post</h1>
        <CommentSection comments={commentData} />
      </main>
    </div>
  );
};

export default PostDetailView;
