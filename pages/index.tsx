import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/nav-bar/nav-bar";

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
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
