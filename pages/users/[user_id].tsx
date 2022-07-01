import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../../components/nav-bar/nav-bar";

const ProfilePage: NextPage = () => {
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
      <NavBar />
    </div>
  );
};

export default ProfilePage;
