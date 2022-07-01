import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/nav-bar/nav-bar";
import PostPlayer from "../components/post-player/post-player";

const Home: NextPage = () => {
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
          <PostPlayer />
        </div>
      </main>
    </div>
  );
};

export default Home;
