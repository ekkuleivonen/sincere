import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar/NavBar";
import PostPlayer from "../components/Post/Post";

import type { PostPlayerPost } from "../components/Post/Post";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<PostPlayerPost[] | null>(null);
  const [sortType, setSortType] = useState<string>("default");

  useEffect(() => {
    console.log("sending sort request");
    async function fetchPosts() {
      const res = await fetch(`/api/posts/all/${sortType}`);
      const data = await res.json();
      const postsArray: PostPlayerPost[] = data.posts;
      setPosts(postsArray);
    }
    fetchPosts();

    return () => {};
  }, [sortType]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sincere</title>
        <meta
          name="description"
          content="The next gen social media platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <div className={styles.postCollection}>
          {posts &&
            posts.map((post) => <PostPlayer key={post.id} post={post} />)}
        </div>
      </main>
    </div>
  );
};

export default Home;
