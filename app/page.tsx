import Hero from "../components/Hero";
import LatestPost from "../components/LatestPost";
import Newsletter from "../components/Newsletter";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <Hero />
      <LatestPost />
      <Newsletter />
    </>
  );
};

export default Home;
